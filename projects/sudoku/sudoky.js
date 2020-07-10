class Grid {
  constructor(max) {
    this.sqrt = Math.sqrt(max);
    if (!Number.isInteger(this.sqrt)) {
      return { invalid: true };
    }
    this.max = max;
    this.numCells = max ** 2;
  }

  newCell() {
    return new Cell(this.max);
  }

  html() {}
}

class Cell {
  constructor(max, initialVal) {
    this.possibilities = this.initialVal = initialVal;
  }

  html() {
    let td = document.createElement("td");
    return td;
  }
}

class Possibilities {
  constructor(max) {
    this.vals = [...Array(max + 1).keys()];
    this.vals.shift();
  }

  is(val) {
    if (this.vals[val - 1]) {
      return true;
    }
    return false;
  }

  count() {
    return this.vals.filter(Boolean).length;
  }

  remove(val) {
    let p = val - 1;
    this.vals[p] = 0;
  }
}

p = new Possibilities(9);
g = new Grid(5);
