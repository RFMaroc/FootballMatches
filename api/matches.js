import fetch from 'node-fetch';

export default async function handler(req, res) {
  const today = new Date().toISOString().split('T')[0];
  const leagues = [39, 140, 135, 78, 61, 250]; // IDs des championnats
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Clé API manquante' });
  }

  try {
    const promises = leagues.map(id =>
      fetch(`https://v3.football.api-sports.io/fixtures?date=${today}&league=${id}`, {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': apiKey
        }
      }).then(res => res.json())
    );

    const results = await Promise.all(promises);
    const matches = results.flatMap(r => r.response ?? []);

    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ error: 'Erreur API', details: err.message });
  }
}
