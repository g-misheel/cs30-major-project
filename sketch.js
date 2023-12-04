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

// function preload() {
  
// }

function setup() {
  startGame();

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
      tile.addEventListener("dragend", dragEnd); //drag process ends, swap candies
      tile.addEventListener("drop", dragDrop); //drop candy


      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
  console.log(board);
}

function dragStart() {
  console.log(this.id, "dragstart");
}

function dragOver() {
  console.log(this.id, "dragover");
}

function dragEnter() {
  console.log(this.id, "dragenter");
}

function dragLeave() {
  console.log(this.id, "dragleave");
}

function dragEnd() {
  console.log(this.id, "dragend");
}

function dragDrop() {
  console.log(this.id, "drop");
}

// class Candy {
//   constructor(x, y, type) {
//     this.x = x;
//     this.y = y;
//     this.type = type;
//   }
// }