class Game {
  constructor(max) {
    this.sqrt = Math.sqrt(max);
    if (!Number.isInteger(this.sqrt)) {
      return { invalid: true };
    }
    this.max = max;
    this.numCells = max ** 2;

    let g = [];
    for (let rg = 0; rg < this.sqrt; rg++) {
      g.push(new RowGroup(this.sqrt).group());
    }
    this.grid = g;
  }

  numberCells() {
    let table = [];
    for (let [index_rg, rg] of this.grid.entries()) {
      for (let [index_row, row] of rg.entries()) {
        for (let [index_col, cell] of row.entries()) {
          let c = Math.floor(index_col / this.sqrt);
          let r = index_rg * this.sqrt;
          let subgrid = r + c;
          cell.subgrid = subgrid;
          cell.row = r + index_row;
          table.push({ index_rg, index_row, index_col, subgrid });
        }
      }
    }
    console.table(table);
  }
}

class RowGroup {
  constructor(subgridSize) {
    this.rows = subgridSize;
    this.rowLength = subgridSize ** 2;
  }

  row() {
    let r = [];
    for (let c = 0; c < this.rowLength; c++) {
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
g = new Game(4);
console.log(g);
g.numberCells();
