export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { action, runId } = req.body || {};
  const APIFY_KEY = process.env.APIFY_API_KEY;
  if (!APIFY_KEY) return res.status(500).json({ error: 'Clé Apify manquante' });
  try {
    if (action === 'start') {
      const { sector, zone, count } = req.body;
      const response = await fetch(`https://api.apify.com/v2/acts/compass~crawler-google-places/runs?token=${APIFY_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchStringsArray: [`${sector} ${zone}`], maxCrawledPlacesPerSearch: count, language: 'fr', countryCode: 'fr' })
      });
      return res.status(response.status).json(await response.json());
    }
    if (action === 'status') {
      const response = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_KEY}`);
      return res.status(response.status).json(await response.json());
    }
    if (action === 'results') {
      const response = await fetch(`https://api.apify.com/v2/actor-runs/${runId}/dataset/items?token=${APIFY_KEY}&format=json&clean=true`);
      return res.status(response.status).json(await response.json());
    }
    return res.status(400).json({ error: 'Action inconnue' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
