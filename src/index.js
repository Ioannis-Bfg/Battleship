import _ from "lodash";
import Ship from "./modules/ship";
import Player from "./modules/player";
import GameBoard from "./modules/gameboard";
import StartGame from "./modules/gamestart";
import "./styles/styles.css";
import "./styles/reset.css";
import { loadBoard } from "./modules/loadStatic";
import { switch_intro } from "./modules/loadStatic";

loadBoard();
switch_intro((inputValue) => StartGame(inputValue));
