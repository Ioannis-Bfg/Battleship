const Ship = require("./ship");
const GameBoard = require("./gameboard");
const Player = require("./player");

function StartGame() {
  let turn = {};
  const user_board = new GameBoard();
  const user = new Player("Ioannis", user_board);
  const enemy_board = new GameBoard();
  const enemy = new Player("CPU", enemy_board);
  const user_ship = new Ship(3, 3, false);
  const enemy_ship = new Ship(2, 2, false);

  user_board.placeShip(0, 0, user_ship, true);
  enemy_board.placeShip(5, 6, enemy_ship, true);
  turn = user;

  while (!user_board.allShipsSunk || !enemy_board.allShipsSunk) {
    if (turn == user) {
      user.randomAttack(enemy_board);
      turn = enemy;
    } else if (turn == enemy) {
      enemy.randomAttack(user_board);
      turn = user;
    }
  }

  return { user, enemy, user_board, enemy_board };
}

module.exports = StartGame;
