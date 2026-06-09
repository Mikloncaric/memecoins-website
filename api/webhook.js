const { kv } = require('@vercel/kv');

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

  if (incomingLamports > 0) {
    const sol = incomingLamports / 1_000_000_000;
    await Promise.all([
      kv.incrbyfloat('weekly_fees', sol),
      kv.incrbyfloat('total_fees_received', sol),
    ]);
  }

  res.status(200).json({ received: incomingLamports });
};
