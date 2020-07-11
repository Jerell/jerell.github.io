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
    this.numberCells();

    this.html();

    this.updateRow(1, 4);
    this.updateRow(1, 3);

    this.updateCol(1, 1);
  }

  numberCells() {
    for (let [index_rg, rg] of this.grid.entries()) {
      for (let [rowgroup_row, row] of rg.entries()) {
        for (let index_col in row) {
          let c = Math.floor(index_col / this.sqrt);
          let r = index_rg * this.sqrt;
          let subgrid = r + c;
          this.grid[index_rg][rowgroup_row][index_col].rg = index_rg;
          this.grid[index_rg][rowgroup_row][index_col].rg_row = rowgroup_row;
          this.grid[index_rg][rowgroup_row][index_col].subgrid = subgrid;
          this.grid[index_rg][rowgroup_row][index_col].row = r + rowgroup_row;
          this.grid[index_rg][rowgroup_row][index_col].col = parseInt(
            index_col
          );
        }
      }
    }
  }

  html() {
    let container = document.createElement("div");
    container.classList.add("grid");
    container.id = "game";
    document.getElementById("games").append(container);

    function appendAll(to, fromList) {
      fromList.forEach((element) => {
        to.appendChild(element);
      });
    }

    let table = document.createElement("table");
    this.table = table;
    let colGroups = () => {
      let cgs = [];
      let rgs = [];
      for (let i = 0; i < this.sqrt; i++) {
        // Row and column groups
        let cg = document.createElement("colgroup");
        let rg = document.createElement("tbody");

        for (let j = 0; j < this.sqrt; j++) {
          let c = document.createElement("col");
          cg.append(c);

          // Rows
          let row = document.createElement("tr");
          for (let col = 0; col < this.max; col++) {
            let cells = [];
            // Cells
            let td = document.createElement("td");
            cells.push(td);
            appendAll(row, cells);
            rg.append(row);
          }
        }

        cgs.push(cg);
        rgs.push(rg);
      }
      appendAll(table, cgs);
      appendAll(table, rgs);
    };
    colGroups();
    container.append(table);
  }

  selectCellHTML(cell) {
    return cell.select(this.table);
  }

  selectRow(row_num = 0) {
    let index_rg = Math.floor(row_num / this.sqrt);
    let rg = this.grid[index_rg];
    let row = rg[row_num % this.sqrt];
    return row;
  }

  selectCol(col_num = 0) {
    let col = [];
    for (let rg of this.grid) {
      for (let row of rg) {
        col.push(row[col_num]);
      }
    }
    return col;
  }

  selectSubgrid(sg_num = 0) {
    let sg = [];
    for (let rg of this.grid) {
      for (let row of rg) {
        for (let cell of row) {
          if (cell.subgrid === sg_num) {
            sg.push(cell);
          }
        }
      }
    }
    return sg;
  }

  updateRow = (row_num = 0, val) => {
    let index_rg = Math.floor(row_num / this.sqrt);
    for (let col = 0; col < this.max; col++) {
      this.grid[index_rg][row_num % this.sqrt][col].possibilities.remove(val);
    }
  };

  updateCol = (col_num = 0, val) => {
    for (let index_rg = 0; index_rg < this.grid.length; index_rg++) {
      for (
        let index_row = 0;
        index_row < this.grid[index_rg].length;
        index_row++
      ) {
        this.grid[index_rg][index_row][col_num].possibilities.remove(val);
      }
    }
  };
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
    this.possibilities.trigger = (v) => {
      console.log(this.possibilities, v);
    };
    this.initialVal = initialVal;
  }

  select(table) {
    let rowGroup = table.getElementsByTagName("tbody")[this.rg];
    let row = rowGroup.childNodes[this.rg_row];
    return row.childNodes[this.col];
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

  last() {
    return this.vals.filter(Boolean)[0];
  }

  remove(val) {
    if (!val) {
      return;
    }

    let p = val - 1;
    this.vals[p] = 0;
    console.log(this.vals);
    let remaining = this.count();
    if (remaining === 1) {
      this.trigger(this.last());
    }
    return remaining;
  }

  // probably won't be used
  add(val) {
    let p = val - 1;
    this.vals[p] = val;
  }
}

// p = new Possibilities(9);
g = new Game(4);
console.log(g);
