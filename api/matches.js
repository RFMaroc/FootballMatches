import fetch from "node-fetch";

export default async function handler(req, res) {
  const today = new Date().toISOString().split("T")[0];
  const leagues = [39, 140, 135, 78, 61, 250]; // IDs championnats
  const apiKey = process.env.RAPIDAPI_KEY;

  console.log("Clé API utilisée :", apiKey);

  if (!apiKey) {
    return res.status(500).json({ error: "Clé API manquante" });
  }

  try {
    const promises = leagues.map(id =>
      fetch(`https://v3.football.api-sports.io/fixtures?date=${today}&league=${id}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": apiKey
        }
      }).then(res => res.json())
    );

    const results = await Promise.all(promises);
    const matches = results.flatMap(r => r.response ?? []);

    console.log("Nombre de matchs récupérés :", matches.length);
    if (matches.length === 0) console.warn("Aucun match trouvé pour aujourd'hui.");

    res.status(200).json(matches);
  } catch (err) {
    console.error("Erreur fetch API :", err);
    res.status(500).json({ error: "Erreur API", details: err.message });
  }
}
