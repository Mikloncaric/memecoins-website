const { Redis } = require('@upstash/redis');
const redis = Redis.fromEnv();

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end();

  const [weeklyFees, totalSpent, lastReset, purchases, solPrice] = await Promise.all([
    redis.get('weekly_fees'),
    redis.get('total_spent'),
    redis.get('last_reset'),
    redis.get('purchases'),
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
