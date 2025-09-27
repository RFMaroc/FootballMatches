import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split("T")[0];

    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${today}`;
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
      }
    });

    const data = await response.json();

    console.log("Réponse brute API :", JSON.stringify(data, null, 2));
    console.log("IDs et noms des ligues :", data.response.map(m => `${m.league.id} - ${m.league.name}`));

    const matches = data.response ?? [];
    res.status(200).json(matches);
  } catch (err) {
    console.error("Erreur fetch API :", err);
    res.status(500).json({ error: "Erreur API", details: err.message });
  }
}
