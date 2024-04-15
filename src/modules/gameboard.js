class GameBoard {
  constructor() {
    this.gridSize = 10;
    this.ships = [];
    this.missedAttacks = [];
    this.successfulAttacks = [];
    this.board = this.createEmptyBoard();
  }

  createEmptyBoard() {
    const board = [];
    for (let i = 0; i < this.gridSize; i++) {
      const row = [];
      for (let j = 0; j < this.gridSize; j++) {
        row.push(null);
      }
      board.push(row);
    }
    return board;
  }

  placeShip(x, y, ship, isHorizontal) {
    let ship_length = ship.length;
    const new_coordinates = [];

    // we need to check if the coordinates are correct and if there is any overlap with other ships which just means that all the squares should be null to place it there
    if (isHorizontal) {
      for (let i = 0; i < ship_length; i++) {
        if (x + ship_length > this.gridSize || this.board[x + i][y] !== null) {
          return false;
        }
        new_coordinates.push([x + i, y]);
      }
    } else {
      for (let i = 0; i < ship_length; i++) {
        if (y + ship_length > this.gridSize || this.board[x][y + i] !== null) {
          return false;
        }
        new_coordinates.push([x, y + i]);
      }
    }

    for (const [r, c] of new_coordinates) {
      this.board[r][c] = ship;
    }

    this.ships.push(ship);
    return true;
  }

  receiveAttack(x, y) {
    let target_coordinates = this.board[x][y];
    if (target_coordinates === null) {
      this.missedAttacks.push([x, y]);
      return false;
    } else {
      this.successfulAttacks.push([x, y]);
      target_coordinates.hit();
      return true;
    }
  }

  allShipsSunk() {
    for (const ship of this.ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}

module.exports = GameBoard;
