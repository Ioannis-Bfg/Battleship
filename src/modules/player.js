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

  randomAttack(enemy_board) {
    let x_coor, y_coor;

    do {
      x_coor = Math.floor(Math.random() * 10);
      y_coor = Math.floor(Math.random() * 10);
    } while (enemy_board.isAttacked(x_coor, y_coor));

    return [x_coor, y_coor, enemy_board.receiveAttack(x_coor, y_coor)];
  }
}

module.exports = Player;
