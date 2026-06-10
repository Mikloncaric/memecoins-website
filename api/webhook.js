const { Redis } = require('@upstash/redis');
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

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

  try {
    // Debug logging — capture raw payload shape so we can verify Helius is
    // calling this endpoint and where the fee transfers actually show up.
    await Promise.all([
      redis.incr('debug_webhook_count'),
      redis.set('debug_last_webhook', JSON.stringify({
        receivedAt: new Date().toISOString(),
        txCount: transactions.length,
        sample: transactions.slice(0, 3).map(tx => ({
          type: tx.type,
          feePayer: tx.feePayer,
          nativeTransfers: tx.nativeTransfers,
          tokenTransfers: tx.tokenTransfers,
          accountData: (tx.accountData ?? []).map(a => ({
            account: a.account,
            nativeBalanceChange: a.nativeBalanceChange,
          })),
        })),
      })),
    ]);

    if (incomingLamports > 0) {
      const sol = incomingLamports / 1_000_000_000;
      await Promise.all([
        redis.incrbyfloat('weekly_fees', sol),
        redis.incrbyfloat('total_fees_received', sol),
      ]);
    }
  } catch (e) {
    // Redis quota/outage shouldn't surface as a 5xx to Helius on every call.
    return res.status(200).json({ received: incomingLamports, redisError: e.message });
  }

  res.status(200).json({ received: incomingLamports });
};
