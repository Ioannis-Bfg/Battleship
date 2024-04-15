import _ from "lodash";
import Ship from "./modules/ship";
import Player from "./modules/player";
import GameBoard from "./modules/gameboard";
import StartGame from "./modules/gamestart";
import "./styles/styles.css";
import "./styles/reset.css";
import { loadBoard } from "./modules/loadStatic";

loadBoard();
StartGame();
