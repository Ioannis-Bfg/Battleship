import _, { update } from "lodash";
import Ship from "./modules/ship";
import Player from "./modules/player";
import GameBoard from "./modules/gameboard";
import { StartGame } from "./modules/gamestart";
import "./styles/styles.css";
import "./styles/reset.css";
import { loadBoard } from "./modules/loadStatic";
import { switch_intro } from "./modules/loadStatic";
import { randomizeUserBoard } from "./modules/gamestart";

loadBoard();
switch_intro((inputValue) => {
  const user_name = document.querySelector("#user_name");
  user_name.textContent = `${inputValue}'s Board`;
  let user_board = new GameBoard();
  randomizeUserBoard(user_board);
  // Randomize button event listener
  const randomizeButton = document.getElementById("randomize_btn");
  randomizeButton.addEventListener("click", function () {
    user_board = new GameBoard();
    randomizeUserBoard(user_board);
  });

  // Start button event listener
  const startButton = document.getElementById("begin_game");
  startButton.addEventListener("click", function () {
    startButton.style.display = "none";
    randomizeButton.style.display = "none";
    console.table("board right before", user_board.board);
    StartGame(inputValue, user_board);
  });
});
