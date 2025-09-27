import fetch from "node-fetch";

const allowedLeagues = [
  { id: 39, name: "Premier League" },
  { id: 140, name: "La Liga" },
  { id: 135, name: "Serie A" },
  { id: 78, name: "Bundesliga" },
  { id: 61, name: "Ligue 1" },
  { id: 250, name: "Botola Pro" }
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

    const filteredMatches = data.response.filter(match =>
      allowedLeagues.some(league => Number(league.id) === Number(match.league.id))
    );

    res.status(200).json(filteredMatches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
}
