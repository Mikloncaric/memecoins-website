const { Redis } = require('@upstash/redis');
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// WATCHED_WALLET is currently a high-volume platform-wide account — Helius
// calls this endpoint ~50x/sec. Writing to Redis on every call burns through
// Upstash's request quota in minutes, so incoming amounts are accumulated in
// memory per warm instance and flushed periodically instead.
let pendingLamports = 0;
let lastFlush = 0;
const FLUSH_INTERVAL_MS = 15_000;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const transactions = req.body;
  if (!Array.isArray(transactions)) return res.status(400).end();

  const watchedWallet = process.env.WATCHED_WALLET;
  if (!watchedWallet) return res.status(500).json({ error: 'WATCHED_WALLET not set' });

  let incomingLamports = 0;
  for (const tx of transactions) {
    for (const t of (tx.nativeTransfers ?? [])) {
      if (t.toUserAccount === watchedWallet) {
        incomingLamports += t.amount;
      }
    }
    // Also catch SPL token fee accounts if needed later
  }

  pendingLamports += incomingLamports;

  const now = Date.now();
  if (pendingLamports > 0 && now - lastFlush > FLUSH_INTERVAL_MS) {
    const sol = pendingLamports / 1_000_000_000;
    pendingLamports = 0;
    lastFlush = now;
    try {
      await Promise.all([
        redis.incrbyfloat('weekly_fees', sol),
        redis.incrbyfloat('total_fees_received', sol),
      ]);
    } catch (e) {
      // Redis quota/outage shouldn't surface as a 5xx to Helius on every call.
      return res.status(200).json({ received: incomingLamports, redisError: e.message });
    }
  }

  res.status(200).json({ received: incomingLamports });
};
