function getPot(game) {
  let total = 0;
  for (let i = 0; i < game.players.length; i++) {
    total += game.players[i].wagered;
  }
  return total;
}

exports.getPot = getPot;