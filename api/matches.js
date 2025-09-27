export default async function handler(req, res) {
  const today = new Date().toISOString().split("T")[0];

  const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${today}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erreur API", details: err.message });
  }
}