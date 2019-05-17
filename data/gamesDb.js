let games = [];

module.exports = {
  addGame,
  getGames
};

function addGame(data) {
  return (games = [...games, data]);
}

function getGames() {
  return games;
}
