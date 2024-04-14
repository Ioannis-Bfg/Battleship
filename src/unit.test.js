const ship = require("./ship");

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
});
