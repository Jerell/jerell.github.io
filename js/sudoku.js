
//--The size of the grid will be decided by user input. For initial testing this will be 4x4 but once it works it should default to 9x9
var maxVal = 4;
var defaultVal = 0; //  A cell's default value should be zero

var side = Math.sqrt(maxVal);

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
  this.setAllPossible = setAllPossible;
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
function readBlock(blockNum){
  var block = [];
  var startCellNum = ((blockNum-1) % side) * side + Math.floor((blockNum-1)/side)*maxVal*side;
  for(var i = 0; i < maxVal; i++){
    var cellNum = Math.floor(i/side)*maxVal + i % side;
    block[i] = this.cells[cellNum];
  }
  return block;

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
      if(duplicates.includes(sorted[j]) == false){
        duplicates.push(sorted[j]);
      }
    }
  }
  return duplicates;
}
function isComplete(list){
  var status = true;
  for(var i=0; i<list.length; i++){
    if(list[i] === 0){
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
  var dupes = findDupes(this.readRow(blockNum));
  var noDupesExist = dupes.length === 0 ? true : false;
  var duplicate_string = "Block " + blockNum + " contains too many instances of " + dupes;
  if(noDupesExist){
    duplicate_string = "There are no duplicates in blck " + blockNum;
  }
  return [duplicate_string, noDupesExist];
}

//Grid Object
function Grid(sideLength){  // Side options will be limited to square numbers
  var self = this;
  this.cells = [];
  this.max   = sideLength;
  this.populate = populate;
  this.populate(this.max);

  this.readCell    = readCell;
  this.readRow     = readRow;
  this.readColumn  = readColumn;
  this.readBlock   = readBlock;

  this.findDupes   = findDupes;
  this.isComplete  = isComplete;

  this.checkRow    = checkRow;
  this.checkColumn = checkColumn;
  this.checkBlock  = checkBlock;
}
var g4 = new Grid(4); // Empty test grid



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






//--End
