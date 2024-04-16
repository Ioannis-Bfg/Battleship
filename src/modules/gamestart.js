const Ship = require("./ship");
const GameBoard = require("./gameboard");
const Player = require("./player");

function StartGame(player_name) {
  const user_name = document.querySelector("#user_name");

  let user, enemy, user_board, enemy_board;
  let currentPlayer;

  user_board = new GameBoard();
  user = new Player(player_name, user_board);
  user_name.textContent = `${user.name}'s board`;

  enemy_board = new GameBoard();
  enemy = new Player("CPU", enemy_board);

  randomlyPlaceShips(user_board, [
    new Ship(5, 5, false),
    new Ship(4, 4, false),
    new Ship(3, 3, false),
    new Ship(3, 3, false),
    new Ship(2, 2, false),
  ]);
  randomlyPlaceShips(enemy_board, [
    new Ship(5, 5, false),
    new Ship(4, 4, false),
    new Ship(3, 3, false),
    new Ship(3, 3, false),
    new Ship(2, 2, false),
  ]);

  updateBoards(user_board, enemy_board);

  console.table(enemy_board.board);
  currentPlayer = enemy;

  const enemy_grid = document.querySelector("#cpu_board");

  function switchTurn() {
    currentPlayer = currentPlayer === user ? enemy : user;
    if (currentPlayer === enemy) {
      enemy_grid.style.opacity = "0.5";
      enemy_grid.style.pointerEvents = "none";
      setTimeout(() => {
        handleCPUTurn();
        enemy_grid.style.opacity = "1";
        enemy_grid.style.pointerEvents = "";
      }, 1000);
    }
  }

  function handleCPUTurn() {
    const user_grid = document.querySelector("#user_board");
    let attack = enemy.randomAttack(user_board);
    console.log(attack);
    let attack_status = attack[2];
    if (attack[0] == 0) {
      coordinates = attack[1];
    } else {
      coordinates = "" + attack[0] + attack[1];
    }
    console.log(`#u_square_${coordinates}`);
    const attacked_square = document.querySelector(`#u_square_${coordinates}`);
    console.log(attacked_square.id);
    if (attack_status) {
      const message = document.querySelector("#status_message");
      const status = document.querySelector("#status");
      attacked_square.classList.add("hit");
      message.textContent = "Enemy HIT";
      status.style.backgroundColor = "red";
    } else {
      const message = document.querySelector("#status_message");
      const status = document.querySelector("#status");
      attacked_square.classList.add("miss");

      message.textContent = "Enemy MISS";
      status.style.backgroundColor = "green";
    }
    gameLoop();
  }

  enemy_grid.addEventListener("click", (event) => {
    if (currentPlayer === user) {
      handleUserTurn(event, user, enemy_board, switchTurn);
    }
  });

  function gameLoop() {
    if (checkWinCondition(user_board, enemy_board) == true) {
      if (user_board.allShipsSunk()) {
        showWinner(enemy.name);
        return;
      } else if (enemy_board.allShipsSunk()) {
        showWinner(user.name);
        return;
      }
      return;
    } else {
      switchTurn();
    }
  }

  function checkWinCondition(user_board, enemy_board) {
    if (user_board.allShipsSunk() || enemy_board.allShipsSunk()) {
      return true;
    } else {
      return false;
    }
  }

  function handleUserTurn(event, user, enemy_board, switchTurn) {
    if (event.target.classList.contains("square")) {
      let id = event.target.id;
      let coordinates = id.split("_").pop();
      if (coordinates.length === 1) {
        coordinates = "0" + coordinates;
      }

      if (
        user.attack(
          parseInt(coordinates[0]),
          parseInt(coordinates[1]),
          enemy_board
        )
      ) {
        const message = document.querySelector("#status_message");
        const status = document.querySelector("#status");
        message.textContent = "You hit an enemy vessel!";
        event.target.classList.add("hit");
        status.style.backgroundColor = "green";
      } else {
        const message = document.querySelector("#status_message");
        const status = document.querySelector("#status");
        message.textContent = "You missed";
        event.target.classList.add("miss");
        status.style.backgroundColor = "red";
      }
      gameLoop();
    }
  }

  gameLoop();

  return { user, enemy, user_board, enemy_board };
}

function randomlyPlaceShips(board, ships) {
  const gridSize = board.gridSize;
  for (const ship of ships) {
    let placed = false;
    while (!placed) {
      const x = getRandomInt(0, gridSize - 1);
      const y = getRandomInt(0, gridSize - 1);
      const isHorizontal = Math.random() < 0.5;
      placed = board.placeShip(x, y, ship, isHorizontal);
    }
  }
}

function updateBoards(user_board, enemy_board) {
  const user_board_dom = document.querySelector("#user_board");
  const cpu_board_dom = document.querySelector("#cpu_board");

  for (let row = 0; row < user_board.gridSize; row++) {
    for (let col = 0; col < user_board.gridSize; col++) {
      if (user_board.board[row][col] != undefined) {
        let index = 0;
        if (row == 0) {
          index = col;
        } else {
          index = "" + row + col;
        }
        let temp_square = document.querySelector(`#u_square_${index}`);

        if (user_board.board[row][col].length == 2) {
          temp_square.style.setProperty(
            "background-color",
            "black",
            "important"
          );
        }
        if (user_board.board[row][col].length == 4) {
          temp_square.style.setProperty("background-color", "red", "important");
        }
        if (user_board.board[row][col].length == 5) {
          temp_square.style.setProperty(
            "background-color",
            "orange",
            "important"
          );
        }

        if (user_board.board[row][col].length == 3) {
          temp_square.style.setProperty(
            "background-color",
            "yellow",
            "important"
          );
        }
      }
    }
  }
}

function showWinner(winnerName) {
  const modal = document.getElementById("myModal");
  const message = document.getElementById("winnerMessage");
  const okButton = document.getElementById("okButton");

  message.textContent = winnerName + " wins!";
  modal.style.display = "block";

  okButton.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = StartGame;
