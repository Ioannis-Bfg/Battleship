const ship = require("./ship");
const GameBoard = require("./gameboard");

describe("Main tests", () => {
  describe("Ship Object works correctly", () => {
    let test_ship;

    beforeEach(() => {
      test_ship = new ship(3, 3, false);
    });

    test("Creates a new object with appropriate properties", () => {
      expect(test_ship.length).toBe(3);
      expect(test_ship.hp).toBe(3);
      expect(test_ship.sunk).toBe(false);
    });

    test("Boats get hit and lose hp", () => {
      test_ship.hit();
      expect(test_ship.hp).toBe(2);
    });

    test("Boats get recognized as not sunk if not hit enough times", () => {
      test_ship.hit();
      test_ship.hit();
      test_ship.isSunk();
      expect(test_ship.sunk).toBe(false);
    });

    test("Boats get recognized as sunk if hit enough times", () => {
      test_ship.hit();
      test_ship.hit();
      test_ship.hit();
      test_ship.isSunk();
      expect(test_ship.sunk).toBe(true);
    });
  });

  describe("GameBoard works correctly", () => {
    let test_gameBoard;
    let test_ship;

    beforeEach(() => {
      test_gameBoard = new GameBoard();
      test_ship = new ship(3, 3, false);
    });

    test("GameBoard is created and everything inside is null", () => {
      expect(test_gameBoard.gridSize).toBe(10);
      expect(test_gameBoard.ships).toStrictEqual([]);
      expect(test_gameBoard.missedAttacks).toStrictEqual([]);
      expect(test_gameBoard.successfulAttacks).toStrictEqual([]);
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          expect(test_gameBoard.board[i][j]).toBe(null);
        }
      }
    });

    test("GameBoard correctly places ships", () => {
      test_gameBoard.placeShip(0, 0, test_ship, true);
      expect(test_gameBoard.board[0][0]).toBe(test_ship);
      expect(test_gameBoard.board[0][1]).toBe(test_ship);
      expect(test_gameBoard.board[0][2]).toBe(test_ship);
      expect(test_gameBoard.board[0][3]).toBe(null);
      expect(test_gameBoard.ships[0]).toBe(test_ship);
    });

    test("GameBoard receives attacks and recognizes if they hit or not", () => {
      test_gameBoard.placeShip(0, 0, test_ship, true);
      expect(test_gameBoard.receiveAttack(0, 1)).toBe(true);
      expect(test_gameBoard.receiveAttack(3, 1)).toBe(false);
    });

    test("GameBoard recognizes when all ships have been sunk", () => {
      test_gameBoard.placeShip(0, 0, test_ship, true);

      for (let i = 0; i < test_gameBoard.ships.length; i++) {
        expect(test_gameBoard.allShipsSunk()).toBe(false);
      }

      test_ship.hit();
      test_ship.hit();
      test_ship.hit();
      for (let j = 0; j < test_gameBoard.ships.length; j++) {
        expect(test_gameBoard.allShipsSunk()).toBe(true);
      }
    });
  });
});
