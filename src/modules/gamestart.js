const Ship = require("./ship");
const GameBoard = require("./gameboard");
const Player = require("./player");

function StartGame(player_name, user_board) {
  const user_name = document.querySelector("#user_name");

  let user, enemy, enemy_board;
  let currentPlayer;
  user = new Player(player_name, user_board);
  user_name.textContent = `${user.name}'s board`;

  enemy_board = new GameBoard();
  enemy = new Player("CPU", enemy_board);

  const enemy_carrier = new Ship(5, 5, false);
  const enemy_battleship = new Ship(4, 4, false);
  const enemy_destroyer = new Ship(3, 3, false);
  const enemy_submarine = new Ship(3, 3, false);
  const enemy_patrol_boat = new Ship(2, 2, false);

  randomlyPlaceShips(enemy_board, [
    enemy_carrier,
    enemy_battleship,
    enemy_destroyer,
    enemy_submarine,
    enemy_patrol_boat,
  ]);
  currentPlayer = enemy;

  const enemy_grid = document.querySelector("#cpu_board");
  enemy_grid.classList.remove("blocked");

  const user_grid_dom = document.querySelector("#user_board");

  updateBoards(user_board);
  function switchTurn() {
    currentPlayer = currentPlayer === user ? enemy : user;
    if (currentPlayer === enemy) {
      user_grid_dom.style.opacity = "1";
      enemy_grid.style.opacity = "0.5";
      enemy_grid.style.pointerEvents = "none";
      setTimeout(() => {
        handleCPUTurn();
        enemy_grid.style.opacity = "1";
        enemy_grid.style.pointerEvents = "";
      }, 1000);
    } else {
      user_grid_dom.style.opacity = "0.5";
    }
  }

  function handleCPUTurn() {
    const user_grid = document.querySelector("#user_board");
    let attack = enemy.randomAttack(user_board);
    let attack_status = attack[2];
    if (attack[0] == 0) {
      coordinates = attack[1];
    } else {
      coordinates = "" + attack[0] + attack[1];
    }
    const attacked_square = document.querySelector(`#u_square_${coordinates}`);
    if (attack_status) {
      const message = document.querySelector("#status_message");
      const status = document.querySelector("#status");
      attacked_square.classList.add("hit");
      message.textContent = "Enemy hit your ship...";
      status.style.background = "#4797ed";
    } else {
      const message = document.querySelector("#status_message");
      const status = document.querySelector("#status");
      attacked_square.classList.add("miss");

      message.textContent = "Enemy missed...";
      status.style.background = "#0a121b";
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
    const message = document.querySelector("#status_message");
    const status = document.querySelector("#status");
    user_grid_dom.style.opacity = "0.3";
    message.style.color = "white";
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
        message.textContent = "You hit an enemy vessel!";
        event.target.classList.add("hit");
        status.style.background = "#4797ed";
      } else {
        message.textContent = "You missed";
        event.target.classList.add("miss");
        status.style.setProperty("background", "#0a121b", "important");
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

function updateBoards(user_board) {
  const user_board_dom = document.querySelector("#user_board");

  for (let row = 0; row < user_board.gridSize; row++) {
    for (let col = 0; col < user_board.gridSize; col++) {
      let index = 0;
      if (row == 0) {
        index = col;
      } else {
        index = "" + row + col;
      }
      let temp_square = document.querySelector(`#u_square_${index}`);
      if (user_board.board[row][col] != undefined) {
        if (user_board.board[row][col].length == 2) {
          temp_square.style.setProperty(
            "background-color",
            "#87b8ed",
            "important"
          );
          temp_square.style.setProperty("border-radius", "50%");
        }
        if (user_board.board[row][col].length == 4) {
          temp_square.style.setProperty(
            "background-color",
            "#316ba9",
            "important"
          );
          temp_square.style.setProperty("border-radius", "50%");
        }
        if (user_board.board[row][col].length == 5) {
          temp_square.style.setProperty(
            "background-color",
            " #10ddfd ",
            "important"
          );
          temp_square.style.setProperty("border-radius", "50%");
        }

        if (user_board.board[row][col].length == 3) {
          temp_square.style.setProperty(
            "background-color",
            "#4797ed",
            "important"
          );
          temp_square.style.setProperty("border-radius", "50%");
        }
      } else {
        // Set default background color when board[row][col] is undefined
        temp_square.style.removeProperty("background-color");
        temp_square.style.removeProperty("border-radius", "50%");
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
    location.reload();
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      location.reload();
    }
  };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeUserBoard(user_board) {
  const user_carrier = new Ship(5, 5, false);
  const user_battleship = new Ship(4, 4, false);
  const user_destroyer = new Ship(3, 3, false);
  const user_submarine = new Ship(3, 3, false);
  const user_patrol_boat = new Ship(2, 2, false);
  user_board.board = user_board.createEmptyBoard();
  randomlyPlaceShips(user_board, [
    user_carrier,
    user_battleship,
    user_destroyer,
    user_submarine,
    user_patrol_boat,
  ]);
  updateBoards(user_board);
}

module.exports = { StartGame, randomizeUserBoard };
