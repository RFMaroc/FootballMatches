import fetch from "node-fetch";

const allowedLeagues = [
  { id: 39, name: "Premier League" }, // Angleterre
  { id: 140, name: "La Liga" },       // Espagne
  { id: 135, name: "Serie A" },       // Italie
  { id: 78, name: "Bundesliga" },     // Allemagne
  { id: 61, name: "Ligue 1" },        // France
  { id: 250, name: "Botola Pro" }     // Maroc
];

export default async function handler(req, res) {
  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${today}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.API_FOOTBALL_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
      }
    });

    const data = await response.json();

    // Filtrage type-safe
    const filteredMatches = data.response.filter(match =>
      allowedLeagues.some(league => Number(league.id) === Number(match.league.id))
    );

    res.status(200).json(filteredMatches);
  } catch (err) {
    console.error("Erreur fetch API :", err);
    res.status(500).json({ error: "Impossible de récupérer les matchs" });
  }
}
