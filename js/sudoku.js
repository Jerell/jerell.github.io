$(document).ready(function() {
  //  cell < block < Grid
  //  cells have coordinates, values, and possibilities - max is the size of the grid
  function Cell(xcoord, ycoord, val, max){
    this.x = xcoord;
    this.y = ycoord;
    this.value = val;
    this.max = max;

    this.possibilities = [];          //  (Empty array of possibilities)
    allPossible: function(max){       //  This method sets all numbers up to
      for(var i=0; i<max; i++){       //  the specified maximum
        this.possibilities[i] = true; //  to be possibilities
      }                               //  for this cell
    }                                 //
    this.allPossible();               // The method is called when the cell is created

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

}
