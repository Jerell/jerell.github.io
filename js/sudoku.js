
//--The size of the grid will be decided by user input. For initial testing this will be 4x4 but once it works it should default to 9x9
var maxVal = 4;
var defaultVal = 0; //  A cell's default value should be zero

var nameString = "g"; //The start of the grid names

//  cell < block < Grid

//  cells have coordinates, values, and possibilities - max is the size of the grid which is one block side length squared


//Cell functions
function assignCellAttributes(cell){
  cell.setAttribute("type", "number");
  cell.setAttribute("name", "active-grid");
  cell.setAttribute("inputmode", "numeric");
  cell.setAttribute("value", "0");

}
function setAllPossible(max){       //  This method sets all numbers up to
  for(var i=0; i<max; i++){       //  the specified maximum
    this.possibilities[i] = true; //  to be possibilities
  }                               //  for this cell
}                                 //
function removePos(p){
  if(p <= this.max){
    this.possibilities[p - 1] = false;
  }
}
function addPos(p){
  if(p <= this.max){
    this.possibilities[p - 1] = true;
  }
}
function checkLastPossible(){
  var numLeft = 0;
  // count the remaining possibilities
  for(var i = 0; i < this.possibilities.length; i++){
    if(this.possibilities[i] === true){
      numLeft++;
    }
  }
  // if only one possibility remains, set this cell to that value
  if(numLeft == 1){
    for(i=1; i <= this.possibilities.length; i++){
      if(this.possibilities[i-1] === true){
        this.setValue(i);
      }
    }
  }
}
function setValue(newValue){     //  Set the new value and remove other possibilities
  this.number = newValue;
  if(newValue !== 0){
    for(var i=1; i<=this.max + 1; i++){
      if(i != newValue){
        this.removePos(i);
      }
    }
  }
  this.updateVal();
}
function updateVal(){
  this.value = this.number;
}
function updateNum(){
  this.number = this.value;
}

//Cell Object
function Cell(xcoord, ycoord, val, max){
  var self = document.createElement('input');
  assignCellAttributes(self);
  //--Cell info
  self.x = xcoord;
  self.y = ycoord;

  self.number = val;
  self.updateNum = updateNum;
  self.updateVal = updateVal;
  self.updateVal();

  //--Possibilities
  self.max = max;
  self.min = 0;
  self.possibilities = [];          //  (Empty array of possibilities)
  self.setAllPossible = setAllPossible;
  self.setAllPossible(self.max);

  self.removePos = removePos;
  self.addPos = addPos;

  self.checkLastPossible = checkLastPossible;

  self.setValue = setValue;

  self.onchange = updateNum;

  return self;
}

// Grid functions
function populate(max){
  for(var i=0; i< max * max; i++){  //  A grid will have [maxVal] squared cells
    var x = i % max;                    //  A cell's x coord is the cell number mod [maxVal]
    var y = Math.floor(i/max);          //  A cell's y coord is the cell number divided by [maxVal] rounded down
    this.cells[i] = new Cell(x, y, defaultVal, max);  //  [defaultVal] should be zero
    this.append(this.cells[i]);
  }
}

function readCell(x, y) {
  var cellNum = (y - 1) * maxVal + (x - 1);
  return this.cells[cellNum].number;
}
function readRow(rowNum){
  var row = [];
  var startCellNum = (rowNum - 1) * maxVal;
  for(var i=0; i<maxVal; i++){
    row[i] = this.cells[startCellNum + i].number;
  }
  return row;
}
function readColumn(colNum){
  var col = [];
  var startCellNum = colNum - 1;
  for(var i=0; i<maxVal; i++){
    col[i] = this.cells[startCellNum + maxVal*i].number;
  }
  return col;
}
function readBlock(blockNum){
  var side = this.blockSideLength;
  var block = [];
  var startCellNum = ((blockNum-1) % side) * side + Math.floor((blockNum-1)/side)*maxVal*side;
  for(var i = 0; i < maxVal; i++){
    var cellNum = Math.floor(i/side)*maxVal + i % side;
    block[i] = this.cells[cellNum].number;
  }
  return block;
}

function rowRemovePos(rowNum, pos){
  var startCellNum = (rowNum - 1) * maxVal;
  for(var i=0; i<maxVal; i++){
    this.cells[startCellNum + i].removePos(pos);
  }
}
function colRemovePos(colNum, pos){
  var startCellNum = colNum - 1;
  for(var i=0; i<maxVal; i++){
    this.cells[startCellNum + maxVal*i].removePos(pos);
  }
}
function blockRemovePos(blockNum, pos){
  var side = this.blockSideLength;
  var startCellNum = ((blockNum-1) % side) * side + Math.floor((blockNum-1)/side)*maxVal*side;
  for(var i = 0; i < maxVal; i++){
    var cellNum = Math.floor(i/side)*maxVal + i % side;
    this.cells[cellNum].removePos(pos);
  }
}

function findDupes(cellList){
  var list = cellList;
  var values = [];
  if(typeof(list[0]) === 'object'){
    for(var i = 0; i < list.length; i++){
      values.push(list[i].value);
    }
    list = values;
  }
  var complete = true;
  var sorted = list;
  sorted.sort();
  var duplicates = [];

  for(var j=0; j < sorted.length; j++){
    //  check there is a number in every cell
    if(list[j] === 0){
      complete = false;
    }
    //  compare
    if(sorted[j] == sorted[j+1]){
      if(duplicates.includes(sorted[j]) === false){
        duplicates.push(sorted[j]);
      }
    }
  }
  return duplicates;
}
function isComplete(){
  var status = true;
  var list = this.cells;
  for(var i=0; i<list.length; i++){
    if(list[i].value == 0){
      status = false;
    }
  }
  return status;
}

function checkRow(rowNum){
  var dupes = findDupes(this.readRow(rowNum));
  var noDupesExist = dupes.length === 0 ? true : false;
  var duplicate_string = "Row " + rowNum + " contains too many instances of " + dupes;
  if(noDupesExist){
    duplicate_string = "There are no duplicates in row " + rowNum;
  }
  return [duplicate_string, noDupesExist];
}
function checkColumn(colNum){
  var dupes = findDupes(this.readColumn(colNum));
  var noDupesExist = dupes.length === 0 ? true : false;
  var duplicate_string ="Column " + colNum + " contains too many instances of " + dupes;
  if(noDupesExist){
    duplicate_string = "There are no duplicates in column " + colNum;
  }
  return [duplicate_string, noDupesExist];
}
function checkBlock(blockNum){
  var dupes = findDupes(this.readBlock(blockNum));
  var noDupesExist = dupes.length === 0 ? true : false;
  var duplicate_string = "Block " + blockNum + " contains too many instances of " + dupes;
  if(noDupesExist){
    duplicate_string = "There are no duplicates in block " + blockNum;
  }
  return [duplicate_string, noDupesExist];
}

function loadPuzzle(array){
  if (array.length != this.cells.length) {
    return "Incorrect puzzle size";
  }
  for(var i = 0; i < this.cells.length; i++){
    this.cells[i].setValue(array[i]);
  }
}

function updateNeighbours(cellNum){
  // skip the cell if nothing has been entered
  if(num === 0){
    return;
  }
  //  Gather relevant cell data
  var cell = this.cells[cellNum];
  var side = this.blockSideLength;
  var row = cell.y + 1;
  var column = cell.x + 1;
  var block = Math.ceil(column / side) + side*(Math.ceil(row / side) - 1);

  // Remove the possibility of this value from this cell's neighbours
  var num = cell.value;

  this.rowRemovePos(row, num);
  this.colRemovePos(column, num);
  this.blockRemovePos(block, num);
}

function processPuzzle(){
  // Read a cell
  // Remove possibilities according to row, column, block
  // Check possibilities
  // If there is only one, assign that value to the cell
  // If there are multiple, move to next cell
  // Repeat
  do {
    for(var i = 0; i < this.cells.length; i++){
      this.updateNeighbours(i);
      this.cells[i].checkLastPossible();
    }
  }  while(this.isComplete == false);

}

//Grid Object
function Grid(sideLength, id){  // Side options will be limited to square numbers
  var self = document.createElement('div');
  self.cells = [];
  self.max   = sideLength;
  self.blockSideLength  = Math.sqrt(self.max);
  self.populate = populate;
  self.populate(self.max);

  self.readCell    = readCell;
  self.readRow     = readRow;
  self.readColumn  = readColumn;
  self.readBlock   = readBlock;

  self.rowRemovePos = rowRemovePos;
  self.colRemovePos = colRemovePos;
  self.blockRemovePos = blockRemovePos;

  self.loadPuzzle = loadPuzzle;

  self.updateNeighbours = updateNeighbours;
  self.processPuzzle = processPuzzle;

  self.findDupes   = findDupes;
  self.isComplete  = isComplete;

  self.checkRow    = checkRow;
  self.checkColumn = checkColumn;
  self.checkBlock  = checkBlock;

  self.style.width = self.max * 50 + "px";

  self.id = id;

  self.classList.add("grid");
  return self;
}


//Generating Grids
var existingGrids = [];

function createGrid(size){
  var id = existingGrids.length;
  existingGrids.push(id);

  window[nameString + id] = new Grid(size, id);

}


//Input and Output
function processSimpleInput(){
  var inputs = $("[name='checknums']");
  var dupes = findDupes(inputs);
  var matches = [];
  var clean = [];
  for(var i = 0; i < inputs.length; i++){
    if(dupes.includes(inputs[i].value)){
      matches.push(inputs[i]);
    } else{
      clean.push(inputs[i]);
    }
  }
  $(matches).addClass("dupe");
  $(clean).addClass("clean");
}
function clearDupesFromSimpleInput(){
  $("[name='checknums']").removeClass("dupe");
  $("[name='checknums']").removeClass("clean");
}

//Demo
var currentGridID = 0;

function showGridOnDemo(gridRef){
  var grid = window[gridRef];
  $('.placeholder').empty();
  $('.placeholder').append(grid);
  currentGridID = gridRef[1];
}

var puzzles4x4 = [
  [0, 1, 3, 0,
    2, 0, 0, 0,
    0, 0, 0, 3,
    0, 2, 1, 0]
    ,
    [3, 4, 1, 0,
      0, 2, 0, 0,
      0, 0, 2, 0,
      0, 1, 4, 3]
    ];





    //--End
