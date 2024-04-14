class Ship {
  constructor(length, hp, sunk = false) {
    this.length = length;
    this.hp = hp;
    this.sunk = sunk;
  }

  hit() {
    this.hp = this.hp - 1;
    return this.hp;
  }

  isSunk() {
    if (this.hp == 0) {
      this.sunk = true;
      return this.sunk;
    } else {
      return this.sunk;
    }
  }
}

module.exports = Ship;
