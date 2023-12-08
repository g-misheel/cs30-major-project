// Major Project
// Misheel Gankhuyag
// November 21, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let candies = ["blue", "green", "lightblue", "lightgreen", "orange", "pink", "red", "white", "yellow"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;

let currTile; //current tile
let otherTile;

// function preload() {
  
// }

function setup() {
  startGame();

  setInterval(function() {
    crushCandy();
    
  }, 100);
  
}

function draw() {
  
}




function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];  //0 - 8.99
}

function startGame() {
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      //  <img id="0-0" src="./images/red.png">
      
      let tile = document.createElement("img");
      tile.id = y.toString() + "-" + x.toString();
      // set the tile.src to a random candy
      tile.src = "./images/" + randomCandy() + ".png"; //the name of your image file
      
      //DRAG 

      //https://editor.p5js.org/utopianssuck@gmail.com/sketches/tBSYzMejd
      //https://www.youtube.com/watch?v=o4UmGrPst_c


      tile.addEventListener("dragstart", dragStart); //click on a candy, start the dragging process
      tile.addEventListener("dragover", dragOver); //moving mose to drag candy
      tile.addEventListener("dragenter", dragEnter); //drag candy on top of another candy
      tile.addEventListener("dragleave", dragLeave); //leave candy on top of another candy
      tile.addEventListener("drop", dragDrop); //drop candy
      tile.addEventListener("dragend", dragEnd); //drag process ends, swap candies


      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
  console.log(board);
}


//DRAG FUNCTIONS
function dragStart() {
  //the tile that was clicked on that is getting dragged
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {

}

function dragEnd() {

  let currCoords = currTile.id.split("-");  //id-"0-0"  ->  ["0", "0"]
  let y = parseInt(currCoords[0]); //row
  let x = parseInt(currCoords[1]); //column

  let otherCoords = otherTile.id.split("-");
  let y2 = parseInt(otherCoords[0]);
  let x2 = parseInt(otherCoords[1]);

  //check if on left
  let moveLeft;
  let moveRight;
  let moveDown;
  let moveUp;
  let isAdjacent;

  if (x2 === x - 1 && y2 === y) {
    moveLeft = true;
  }

  //check if on right 
  if (x2 === x + 1 && y2 === y) {
    moveRight = true;
  }

  //check if up 
  if (x2 === x  && y2 === y - 1) {
    moveUp = true;
  }

  //check if down
  if (x2 === x && y2 === y + 1) {
    moveDown = true;
  }

  //check if adjacent
  if (moveDown || moveLeft || moveRight || moveUp) {
    isAdjacent = true;
  }

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    //swap the candies
    currTile.src = otherImg;
    otherTile.src = currImg;
  }
}

function dragDrop() {
  //tile that was dropped on
  otherTile = this;
}

//22:49
function crushCandy() {
  //crush Five
  //crush Four
  
  crushThree();
}

function crushThree() {
  //check row 
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns-2; x++) {
      let candy1 = board[y][x];
      let candy2 = board[y][x+1];
      let candy3 = board[y][x+2];
      if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        
      }
    }
  }

  //check columns
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows-2; y++) {
      let candy1 = board[y][x];
      let candy2 = board[y+1][x];
      let candy3 = board[y+2][x];
      if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
      }
    }
  }
}

// class Candy {
//   constructor(x, y, type) {
//     this.x = x;
//     this.y = y;
//     this.type = type;
//   }
// }