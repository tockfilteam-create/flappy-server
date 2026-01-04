const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let scores = [];

app.post("/score", (req, res) => {
  const { name, score } = req.body;
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  res.json({ ok: true });
});

app.get("/leaderboard", (req, res) => {
  res.json(scores.slice(0, 10));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});