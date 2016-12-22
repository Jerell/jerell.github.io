$(document).ready(function() {
  //--The size of the grid will be decided by user input. For initial testing this will be 4x4 but once it works it should default to 9x9
  var maxVal = 4;
  var defaultVal = 0; //  A cell's default value should be zero

  //--Rows and columns won't actually exist but be read by functions
  //--checkRow(1) will read the [1]st [n] cells in the first [n] blocks in a gris of size [n^2]
  //--checkRow(2) will read the next [n] cells in the first [n] blocks
  //--Assuming grid size 4:
  //--checkRow(3) will read the first [n] cells in the second [n] blocks

  //--[max] is the side length of a block squared
  //--I will need to use the side length a lot so:
  var side = Math.sqrt(maxVal);

  //--checkRow(num) reads [side] cells from the [Math.ceil(num/side)] row of blocks


  //  cell < block < Grid

  //  cells have coordinates, values, and possibilities - max is the size of the grid which is one block side length squared


  //Cell functions
  function setAllPossible(max){       //  This method sets all numbers up to
    for(var i=0; i<max; i++){       //  the specified maximum
      this.possibilities[i] = true; //  to be possibilities
    }                               //  for this cell
  }                                 //
  function removePos(p){
    this.possibilities[p-1] = false;
  }
  function addPos(p){
    this.possibilities[p-1] = true;
  }
  function setValue(newValue){     //  Set the new value and remove other possibilities
    this.value = newValue;
    for(var i=0; i<this.max; i++){
      if(this.possibilities[i] != newValue){
        removePos(i);
      }
    }
  }
  //Cell Object
  function Cell(xcoord, ycoord, val, max){
    //--Cell info
    this.x = xcoord;
    this.y = ycoord;
    this.value = val;
    this.max = max;

    //--Possibilities
    this.possibilities = [];          //  (Empty array of possibilities)
    this.setAllPossible(this.max);       // The method is called when the cell is created
    this.removePos = removePos;
    this.addPos = addPos;
    this.setValue = setValue;
  }

  // Grid functions
  function populate(max){
    for(var i=0; i< max * max; i++){  //  A grid will have [maxVal] squared cells
      var x = i % max;                    //  A cell's x coord is the cell number mod [maxVal]
      var y = Math.floor(i/max);          //  A cell's y coord is the cell number divided by [maxVal] rounded down
      this.cells[i] = new Cell(x, y, defaultVal, max);  //  [defaultVal] should be zero
    }
  }
  function readCell(x, y) {
    var cellNum = y * maxVal + x;
    return this.cells[cellNum];
  }
  function readRow(rowNum){
    var row = [];
    var startCellNum = (rowNum - 1) * maxVal;
    for(var i=0; i<maxVal; i++){
      row[i] = this.cells[startCellNum + i];
    }
    return row;
  }
  function readColumn(colNum){
    var col = [];
    var startCellNum = colNum;
    for(var i=0; i<maxVal; i++){
      col[i] = this.cells[startCellNum + maxVal*i];
    }
    return col;
  }
  function checkRow(row){
    var complete = true;
    //  check there is a number in every cell
    for(var i=0; i<maxVal; i++){
      if(row[i] === 0){
        complete = false;
      }
    }
    //  second loop to check each cell is unique after making sure the row

  }
  //Grid Object
  function Grid(sideLength){
    this.cells = [];
    this.populate = populate;
    this.populate(sideLength);  //  Populate this grid with cells with a maximum value of [sideLength]

    this.readCell = readCell;
    this.readRow = readRow;
    this.readColumn = readColumn;
  }

  //--End

});


//	add references to the research area. look for the guardian article.
