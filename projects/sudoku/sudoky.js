class Game {
  constructor(max) {
    this.sqrt = Math.sqrt(max);
    if (!Number.isInteger(this.sqrt)) {
      return { invalid: true };
    }
    this.max = max;
    this.numCells = max ** 2;
  }

  grid() {
    let g = [];
    for (let rg = 0; rg < this.sqrt; rg++) {
      g.push(new RowGroup(this.sqrt).group());
    }
    return g;
  }
}

class RowGroup {
  constructor(subgridSize) {
    this.rows = subgridSize;
    this.rowLength = subgridSize ** 2;
  }

  row() {
    let r = [];
    console.log("this.rowLength :>> ", this.rowLength);
    for (let c = 0; c < this.rows; c++) {
      r.push(new Cell(this.rowLength));
    }
    return r;
  }

  group() {
    let g = [];
    for (let r = 0; r < this.rows; r++) {
      g.push(this.row());
    }
    return g;
  }
}

class Cell {
  constructor(max, initialVal) {
    this.possibilities = new Possibilities(max);
    this.initialVal = initialVal;
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

// p = new Possibilities(9);
g = new Game(9);
console.log(g);
console.log(g.grid());
