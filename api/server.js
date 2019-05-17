const express = require("express");
const server = express();
const db = require("../data/gamesDb");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ msg: "hello" });
});

server.post("/games", (req, res) => {
  const game = req.body;
  if (
    game.title === null ||
    game.title === "" ||
    game.genre === null ||
    game.genre === ""
  ) {
    res.status(422).json({ msg: "Please fill in the required fields" });
  }
  db.addGame(game);
  res.status(201).json({ msg: "Game added" });
});

server.get("/games", (req, res) => {
  const games = db.getGames();
  res.status(200).json({ games });
});
module.exports = server;
