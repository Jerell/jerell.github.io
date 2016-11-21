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

  function Cell(xcoord, ycoord, val, max){
    //--Cell info

    this.x = xcoord;
    this.y = ycoord;
    this.value = val;
    this.max = max;

    //--Possibilities

    this.possibilities = [];          //  (Empty array of possibilities)
    allPossible: function(max){       //  This method sets all numbers up to
      for(var i=0; i<max; i++){       //  the specified maximum
        this.possibilities[i] = true; //  to be possibilities
      }                               //  for this cell
    }                                 //
    this.allPossible(this.max);       // The method is called when the cell is created

    removePos: function(p){
      this.possibilities[p-1] = false;
    }
    addPos: function(p){
      this.possibilities[p-1] = true;
    }
    setValue: function(newValue){     //  Set the new value and remove other possibilities
      this.value = newValue;
      for(var i=0; i<max; i++){
        if(this.possibilities[i] != newValue){
          removePos(i);
        }
      }
    }

  }

  function Grid(sideLength){
      this.cells = [];

      populate: function(max){
        for(var i=0; i< max * max; i++){  //  A grid will have [maxVal] squared cells
          x = i % max;                    //  A cell's x coord is the cell number mod [maxVal]
          y = Math.floor(i/max);          //  A cell's y coord is the cell number divided by [maxVal] rounded down
          cells[i] = new Cell(x, y, defaultVal, max);  //  [defaultVal] should be zero
        }
      }
      this.populate(sideLength);  //  Populate this grid with cells with a maximum value of [sideLength]

      readCell: function(x, y){
        cellNum = y * max + x;
        return cells[cellNum];
      }

      readRow: function(rowNum){
        row = [];
        for(var i=0; i<max; i++){

        }
      }

  }

  //--End

}
