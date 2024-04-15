const Ship = require("./ship");
const GameBoard = require("./gameboard");
const Player = require("./player");

function StartGame(player_name) {
  const user_name = document.querySelector("#user_name");

  let turn = {};

  // creating user
  const user_board = new GameBoard();
  const user = new Player(player_name, user_board);
  user_name.textContent = `${user.name}'s board`;

  // creating board
  const enemy_board = new GameBoard();
  const enemy = new Player("CPU", enemy_board);

  // User ships
  const user_carrier = new Ship(5, 5, false);
  const user_battleship = new Ship(4, 4, false);
  const user_destroyer = new Ship(3, 3, false);
  const user_submarine = new Ship(3, 3, false);
  const user_patrol_boat = new Ship(2, 2, false);
  // Enemy ships
  const enemy_carrier = new Ship(5, 5, false);
  const enemy_battleship = new Ship(4, 4, false);
  const enemy_destroyer = new Ship(3, 3, false);
  const enemy_submarine = new Ship(3, 3, false);
  const enemy_patrol_boat = new Ship(2, 2, false);

  randomlyPlaceShips(user_board, [
    user_carrier,
    user_battleship,
    user_destroyer,
    user_submarine,
    user_patrol_boat,
  ]);
  randomlyPlaceShips(enemy_board, [
    enemy_carrier,
    enemy_battleship,
    enemy_destroyer,
    enemy_submarine,
    enemy_patrol_boat,
  ]);

  console.log("ehy");
  updateBoards(user_board, enemy_board);
  console.log("hey");

  // turn = user;

  // while (!user_board.allShipsSunk || !enemy_board.allShipsSunk) {
  //   if (turn == user) {
  //     user.randomAttack(enemy_board);
  //     turn = enemy;
  //   } else if (turn == enemy) {
  //     enemy.randomAttack(user_board);
  //     turn = user;
  //   }
  // }

  return { user, enemy, user_board, enemy_board };
}

function randomlyPlaceShips(board, ships) {
  const gridSize = board.gridSize;
  for (const ship of ships) {
    let placed = false;
    while (!placed) {
      const x = getRandomInt(0, gridSize - 1);
      const y = getRandomInt(0, gridSize - 1);
      const isHorizontal = Math.random() < 0.5; // Randomly choose orientation
      placed = board.placeShip(x, y, ship, isHorizontal);
    }
  }
}

function updateBoards(user_board, enemy_board) {
  const user_board_dom = document.querySelector("#user_board");
  const cpu_board_dom = document.querySelector("#cpu_board");

  for (let row = 0; row < user_board.gridSize; row++) {
    for (let col = 0; col < user_board.gridSize; col++) {
      if (user_board.board[row][col] !== null) {
        let index = 0;
        if (row == 0 && col == 0) {
          index = 0;
        } else {
          index =
            String(row).replace(/^0+/, "") + String(col).replace(/^0+/, "");
        }
        console.log(`u_square_${index}`);
        let temp_square = document.querySelector(`#u_square_${index}`);

        temp_square.style.setProperty("background-color", "black", "important");
      }
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = StartGame;
