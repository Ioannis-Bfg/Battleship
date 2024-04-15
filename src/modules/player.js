class Player {
  constructor(name, board) {
    this.name = name;
    this.player_board = board;
  }

  attack(x, y, enemy_board) {
    if (enemy_board.receiveAttack(x, y)) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Player;
