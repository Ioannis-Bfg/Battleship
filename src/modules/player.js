class Player {
  constructor(name, board) {
    this.name = name;
    this.player_board = board;
  }

  attack(x, y, enemy_board) {
    enemy_board.receiveAttack(x, y);
  }
}

module.exports = Player;
