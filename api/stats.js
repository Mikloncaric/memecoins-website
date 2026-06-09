const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end();

  const [weeklyFees, totalSpent, lastReset, purchases, solPrice] = await Promise.all([
    kv.get('weekly_fees'),
    kv.get('total_spent'),
    kv.get('last_reset'),
    kv.get('purchases'),
    getSolPrice(),
  ]);

  res.json({
    weeklyFees:  weeklyFees  ?? 0,
    totalSpent:  totalSpent  ?? 0,
    lastReset:   lastReset   ?? null,
    purchases:   purchases   ?? [],
    solPrice:    solPrice,
  });
};

async function getSolPrice() {
  try {
    const r = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
    );
    const d = await r.json();
    return d?.solana?.usd ?? 0;
  } catch {
    return 0;
  }
}
