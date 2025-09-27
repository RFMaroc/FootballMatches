import fetch from "node-fetch";

export default async function handler(req, res) {
  const today = new Date().toISOString().split("T")[0];
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Clé API manquante" });
  }

  try {
    const url = `https://v3.football.api-sports.io/fixtures?date=${today}`;
    const response = await fetch(url, {
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": apiKey
      }
    });
    const data = await response.json();

    const matches = data.response ?? [];
    console.log("Nombre de matchs récupérés :", matches.length);

    res.status(200).json(matches);
  } catch (err) {
    console.error("Erreur fetch API :", err);
    res.status(500).json({ error: "Erreur API", details: err.message });
  }
}
