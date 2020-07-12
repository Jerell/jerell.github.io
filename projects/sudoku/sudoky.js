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
    this.html();
    this.numberCells();
  }

  numberCells() {
    for (let [index_rg, rg] of this.grid.entries()) {
      for (let [rowgroup_row, row] of rg.entries()) {
        for (let index_col in row) {
          let c = Math.floor(index_col / this.sqrt);
          let r = index_rg * this.sqrt;
          let subgrid = r + c;

          this.grid[index_rg][rowgroup_row][index_col].autofill = (
            cell,
            val
          ) => {
            this.setCellValue(cell, val, true);
          };
          this.grid[index_rg][rowgroup_row][index_col].rg = index_rg;
          this.grid[index_rg][rowgroup_row][index_col].rg_row = rowgroup_row;
          this.grid[index_rg][rowgroup_row][index_col].subgrid = subgrid;
          this.grid[index_rg][rowgroup_row][index_col].row = r + rowgroup_row;
          this.grid[index_rg][rowgroup_row][index_col].col = parseInt(
            index_col
          );

          let clicky = () => {
            let input = parseInt(prompt("what number"));
            if (!input) {
              return;
            }
            this.setCellValue(
              this.grid[index_rg][rowgroup_row][index_col],
              input,
              false
            );
          };

          this.grid[index_rg][rowgroup_row][index_col].select(
            this.table
          ).onclick = clicky;
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
    try {
      return cell.select(this.table);
    } catch {
      console.log(cell);
    }
  }

  cellIsEmpty(cell) {
    try {
      return cell.value == false;
    } catch (e) {
      console.log(cell, e);
    }
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

  checkNeighbours(cell) {
    let g = this;
    let maxVal = this.max;

    function isMain(c) {
      let xMatch = c.row === cell.row;
      let yMatch = c.col === cell.col;
      return xMatch && yMatch;
    }

    function excludeSelf(list) {
      return list.filter((c) => g.cellIsEmpty(c) && !isMain(c));
    }
    let n_sg = excludeSelf(this.selectSubgrid(cell.subgrid));
    let n_row = excludeSelf(this.selectRow(cell.row));
    let n_col = excludeSelf(this.selectCol(cell.col));

    let neighbours = [n_sg, n_row, n_col];

    function valueNotPossibleInAny(neighbours) {
      let cellPossibilities = cell.possibilities;
      for (let p of cellPossibilities.remaining) {
        let notPossInAny = neighbours
          .map((n) => !n.possibilities.is(p))
          .every(Boolean);
        if (notPossInAny) {
          return p;
        }
      }
      return false;
    }
    if (this.cellIsEmpty(cell)) {
      for (let neighbour of neighbours) {
        let v = valueNotPossibleInAny(neighbour);
        if (v) {
          cell.setValue(v, this.table);
        }
      }
    }
    return;
  }

  applyToAllCells = (func) => {
    let bound = func.bind(this);
    for (let index_rg = 0; index_rg < this.grid.length; index_rg++) {
      for (
        let index_row = 0;
        index_row < this.grid[index_rg].length;
        index_row++
      ) {
        for (
          let index_col = 0;
          index_col < this.grid[index_rg][index_row].length;
          index_col++
        ) {
          bound(this.grid[index_rg][index_row][index_col]);
        }
      }
    }
  };

  setCellValue(cell, val, auto) {
    if (!cell.setValue(val, this.table, auto)) {
      return;
    }
    this.updateRow(cell.row, val);
    this.updateCol(cell.col, val);
    this.updateSubgrid(cell.subgrid, val);
    this.applyToAllCells(this.checkNeighbours);
  }

  updateRow = (row_num = 0, val) => {
    let index_rg = Math.floor(row_num / this.sqrt);
    for (let col = 0; col < this.max; col++) {
      if (
        this.selectCellHTML(this.grid[index_rg][row_num % this.sqrt][col])
          .innerHTML
      ) {
        continue;
      }
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
        if (
          this.selectCellHTML(this.grid[index_rg][index_row][col_num]).innerHTML
        ) {
          continue;
        }
        this.grid[index_rg][index_row][col_num].possibilities.remove(val);
      }
    }
  };

  updateSubgrid(sg_num = 0, val) {
    for (let index_rg = 0; index_rg < this.grid.length; index_rg++) {
      for (
        let index_row = 0;
        index_row < this.grid[index_rg].length;
        index_row++
      ) {
        for (
          let index_col = 0;
          index_col < this.grid[index_rg][index_row].length;
          index_col++
        ) {
          if (
            this.selectCellHTML(this.grid[index_rg][index_row][index_col])
              .innerHTML
          ) {
            continue;
          }
          if (this.grid[index_rg][index_row][index_col].subgrid === sg_num) {
            this.grid[index_rg][index_row][index_col].possibilities.remove(val);
          }
        }
      }
    }
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
    this.possibilities.trigger = (v) => {
      this.autofill(this, v);
    };
    this.value = initialVal ? initialVal : 0;
  }

  setValue(val, table, auto = false) {
    if (!this.value && !this.possibilities.is(val)) {
      return false;
    }
    this.value = val;
    let html = this.select(table);

    // Colour change
    function flash() {
      if (html.innerHTML) return;
      let cl_name = auto ? "processing" : "entering";
      html.classList.add(cl_name);
      setTimeout(() => {
        html.classList.remove(cl_name);
      }, 100);
    }

    flash();

    html.innerHTML = val;
    return true;
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

  get remaining() {
    return this.vals.filter(Boolean);
  }

  get count() {
    return this.remaining.length;
  }

  get last() {
    return this.remaining[0];
  }

  remove(val) {
    if (!val) {
      return;
    }

    let p = val - 1;
    if (this.count) {
      this.vals[p] = 0;
      let remainingCount = this.count;
      if (remainingCount === 1 && this.trigger) {
        this.trigger(this.last);
      }
      return remainingCount;
    }
  }

  // probably won't be used
  add(val) {
    let p = val - 1;
    this.vals[p] = val;
  }
}

g = new Game(4);
h = new Game(9);
