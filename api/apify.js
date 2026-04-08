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
      const response = await fetch(`https://api.apify.com/v2/acts/apify~google-maps-scraper/runs?token=${APIFY_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchStringsArray: [`${sector} ${zone}`],
          maxCrawledPlacesPerSearch: parseInt(count),
          language: 'fr',
          countryCode: 'fr',
          maxImages: 0,
          maxReviews: 0
        })
      });
      const data = await response.json();
      if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || JSON.stringify(data) });
      return res.status(200).json(data);
    }

    if (action === 'status') {
      const response = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_KEY}`);
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (action === 'results') {
      const response = await fetch(`https://api.apify.com/v2/actor-runs/${runId}/dataset/items?token=${APIFY_KEY}&format=json&clean=true`);
      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'Action inconnue' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
