// Major Project
// Misheel Gankhuyag
// November 21, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//candy variables
let candies = ["blue", "green", "lightblue", "lightgreen", "orange", "pink", "red", "white", "yellow"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;

//function variables
let currTile; //current tile
let otherTile;
let countMoves = 0; //count the number of moves
let targetMoves = 12; //Objective/Target # of moves that is allowed in the level
let targetScore = 120;

//level variables
let level = 1;


function setup() {

  startGame();
  
  
  setInterval(function() {
    crushCandy();
    slideCandy();
    generateCandy();
    checkObjective()
    
  }, 100); //every 1/10th of a second

  document.getElementById("play-again-button").addEventListener("click", playAgainButtonClicked);
  document.getElementById("next-level-button").addEventListener("click", nextLevelButtonClicked);
  
}



function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];  //0 - 8.99
}

//game function
function startGame() {
  
  //background music
  playBgMusic();

  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      
      let tile = document.createElement("img");
      tile.id = y.toString() + "-" + x.toString();
      // set the tile.src to a random candy
      tile.src = "./images/" + randomCandy() + ".png"; //the name of your image file
      

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

  if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }

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

    if (!checkValid()) {
      let currImg = currTile.src;
      let otherImg = otherTile.src;
      //swap the candies
      currTile.src = otherImg;
      otherTile.src = currImg;
    }
  }

  
}



function dragDrop() {
  //tile that was dropped on
  otherTile = this;
  if (targetMoves > 0){ //no negative #'s
    targetMoves --;
    countMoves ++;
  }
  
}

//22:49
function crushCandy() {
  crushFour();
  
  crushThree();
  document.getElementById("score").innerText = score;
  document.getElementById("moves").innerText = targetMoves;
  document.getElementById("level").innerText = level;
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

        //update score
        playPop();
        score += 10;
        
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

        //update score
        playPop();
        score += 10;

      }
    }
  }
}

function crushFour() {

  //check rows
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns-3; x++) {
      let candy1 = board[y][x];
      let candy2 = board[y][x+1];
      let candy3 = board[y][x+2];
      let candy4 = board[y][x+3];
      if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";

        //update score
        playPlop();
        score += 20;
        
      }
    }
  }

  //check columns
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows-3; y++) {
      let candy1 = board[y][x];
      let candy2 = board[y+1][x];
      let candy3 = board[y+2][x];
      let candy4 = board[y+3][x];
      if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";

        //update score
        playPlop();
        score += 20;

      }
    }
  }
}

function checkValid() {
  //check row 
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns-2; x++) {
      let candy1 = board[y][x];
      let candy2 = board[y][x+1];
      let candy3 = board[y][x+2];
      if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
        return true;
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
        return true;
      }
    }
  }

  return false;
}


function slideCandy() {
  for (let x = 0; x < columns; x++) {
    let ind = rows - 1;
    for (let y = columns-1; y >= 0; y--) {
      if (!board[y][x].src.includes("blank")) {
        board[ind][x].src = board[y][x].src;
        ind -= 1;
      }
    }

    for (let y = ind; y >= 0; y--) {
      board[y][x].src = "/images/blank.png";
    }
  }
}

function generateCandy() {
  for (let x = 0; x < columns;  x++) {
    if (board[0][x].src.includes("blank")) {
      board[0][x].src = "/images/" + randomCandy() + ".png";
    }
  }
}

//function that checks the # of moves and score to determine if the player can go to next level
function checkObjective() {
  if (score >= targetScore) {
    if (level < 4) {
      congrats(score, countMoves);
    } 
    
  } 
    else if (targetMoves <= 0) {
    playAgain(score, countMoves);
    }
}

function congrats(finalScore, numberMoves) {

  // Display a congratulatory message on the screen
  const congratsContent = document.getElementById("congrats-content");
  congratsContent.innerText = `You completed the level!\nFinal Score: ${finalScore}\nNumber of Moves: ${numberMoves}`;

  // Show the congrats message and "Next Level" button
  document.getElementById("congrats-message").style.display = "block";
  document.getElementById("next-level-button").style.display = "block";
}

function playAgain(finalScore, numberMoves) {
  // Display a message for playing again on the screen
  const playAgainContent = document.getElementById("play-again-content");
  playAgainContent.innerText = `You didn't reach the target score. Try again!\nFinal Score: ${finalScore}\nNumber of Moves: ${numberMoves}`;

  // Show the play-again message and "Play Again" button
  document.getElementById("play-again-message").style.display = "block";
  document.getElementById("play-again-button").style.display = "block";
}

function nextLevel() {
  if (level < 4) { // Check if the current level is less than the maximum level
    level++;
    targetMoves -= 2;
    targetScore += 10;

    // Update UI to reflect the new level, target moves, and target score
    document.getElementById("level").innerText = level;
    document.getElementById("moves").innerText = targetMoves;
    document.getElementById("target-score").innerText = targetScore;
  }
}

function playAgainButtonClicked() {
  resetGame();
  document.getElementById("play-again-message").style.display = "none";
}

function nextLevelButtonClicked() {
  resetGame();
  document.getElementById("congrats-message").style.display = "none";
}

function resetGame() {
  // Reset game variables
  score = 0;
  countMoves = 0;
  targetMoves = 12;

  // Clear the game board and generate a new one
  clearGameBoard();
  startGame();

  // Update UI to reflect the reset values
  document.getElementById("score").innerText = score;
  document.getElementById("moves").innerText = targetMoves;
  document.getElementById("level").innerText = level;

  document.getElementById("congrats-message").style.display = "none";
  document.getElementById("play-again-message").style.display = "none";
}

function clearGameBoard() {
  // Clear the board variable
  board = [];

  // Clear the HTML content of the board element
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = '';
}

//background music
function playBgMusic () {
  let backgroundMusic = new Audio("sounds/background-music.mp3");
  backgroundMusic.play();
}

//sound when 3 candies are crushed
function playPop () {
  let popSound = new Audio("sounds/pop1.ogg");
  popSound.play();
}

//sound when 4 candies are crushed
function playPlop () {
  let plopSound = new Audio("sounds/plop.ogg");
  plopSound.play();
}
