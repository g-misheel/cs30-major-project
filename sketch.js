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

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  startGame();
}

function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];  //0 - 8.99
}

function startGame() {
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      // <img>
      let tile = document.createElement("img");
      tile.id = y.toString() + "-" + x.toString();
      //set the tile.src to a random candy
      tile.src = "./images" + randomCandy() + "-candy" + ".png"; //the name of your image file


      //11:25
      document.getElementById()
    }
  }
}