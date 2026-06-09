const { Redis } = require('@upstash/redis');
const redis = Redis.fromEnv();

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { secret, tokenName, tokenCa, tokenSymbol } = req.body ?? {};

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const [weeklyFees, totalSpent, purchases] = await Promise.all([
    redis.get('weekly_fees'),
    redis.get('total_spent'),
    redis.get('purchases'),
  ]);

  const feesUsed = weeklyFees ?? 0;
  const newTotal = (totalSpent ?? 0) + feesUsed;

  const purchase = {
    tokenName:   tokenName   ?? 'Unknown',
    tokenSymbol: tokenSymbol ?? '?',
    tokenCa:     tokenCa     ?? '',
    feesUsed,
    date: new Date().toISOString(),
  };

  await Promise.all([
    redis.set('weekly_fees', 0),
    redis.set('total_spent', newTotal),
    redis.set('last_reset', new Date().toISOString()),
    redis.set('purchases', [purchase, ...(purchases ?? [])]),
  ]);

  res.json({ success: true, purchase, newTotal });
};
