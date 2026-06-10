const { Redis } = require('@upstash/redis');
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { secret } = req.body ?? {};
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const [count, last] = await Promise.all([
    redis.get('debug_webhook_count'),
    redis.get('debug_last_webhook'),
  ]);

  res.json({
    watchedWallet: process.env.WATCHED_WALLET,
    webhookCallCount: count ?? 0,
    lastWebhookPayload: last ?? null,
  });
};
