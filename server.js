const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let leaderboard = [];

app.get("/", (req, res) => {
  res.send("Flappy server is alive 🚀");
});

app.post("/score", (req, res) => {
  const { name, score } = req.body;
  if (!name || score == null) {
    return res.status(400).json({ error: "name and score required" });
  }

  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10);

  res.json({ success: true });
});

app.get("/leaderboard", (req, res) => {
  res.json(leaderboard);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});