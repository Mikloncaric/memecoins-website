const { Redis } = require('@upstash/redis');
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end();

  try {
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
  } catch (e) {
    res.status(500).json({ error: e.message, name: e.name });
  }
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
