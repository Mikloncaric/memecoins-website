const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { secret, tokenName, tokenCa, tokenSymbol } = req.body ?? {};

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const [weeklyFees, totalSpent, purchases] = await Promise.all([
    kv.get('weekly_fees'),
    kv.get('total_spent'),
    kv.get('purchases'),
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
    kv.set('weekly_fees', 0),
    kv.set('total_spent', newTotal),
    kv.set('last_reset', new Date().toISOString()),
    kv.set('purchases', [purchase, ...(purchases ?? [])]),
  ]);

  res.json({ success: true, purchase, newTotal });
};
