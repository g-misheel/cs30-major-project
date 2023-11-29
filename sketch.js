// Major Project
// Misheel Gankhuyag
// November 21, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let candies;
let board;
let rows;
let columns;
let score;
let blueImg;
let greenImg;
let lightblueImg;
let lightgreenImg;
let orangeImg;
let pinkImg;
let redImg;
let whiteImg;
let yellowImg;


function preload() {
  blueImg = loadImage("images/blue.png");
  greenImg = loadImage("images/green.png");
  lightblueImg = loadImage("images/lightblue.png");
  lightgreenImg = loadImage("images/lightgreen.png");
  orangeImg = loadImage("images/orange.png");
  pinkImg = loadImage("images/pink.png");
  redImg = loadImage("images/red.png");
  whiteImg = loadImage("images/white.png");
  yellowImg = loadImage("images/yellow.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  candies = ["blue", "green", "lightblue", "lightgreen", "orange", "pink", "red", "white", "yellow"];
  // candies = [blueImg, greenImg, lightblueImg, lightgreenImg, orangeImg, pinkImg, redImg, whiteImg, yellowImg];
  board = [];
  rows = 9;
  columns = 9;
  score = 0;
}

function draw() {
  // startGame();
}

class Candy {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
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
      tile.src = "./images" + randomCandy() + ".png"; //the name of your image file


      // 11:25
      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
  console.log(board);
}