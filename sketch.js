// Major Project
// Misheel Gankhuyag
// November 21, 2023
//

// Candy variables
let candies = ["blue", "green", "lightblue", "lightgreen", "orange", "pink", "red", "white", "yellow"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;

// Function variables
let currTile; // current tile
let otherTile;
let countMoves = 0; // count the number of moves (for #message)
let targetMoves = 12; // Objective/Target # of moves that are allowed in the level
let targetScore = 120;
let movesLeft = targetMoves; // tracks the number of moves left

// Level variables
let level = 1;

// Setup function
function setup() {
  startGame();
  
  // Set interval to run game functions every 1/10th of a second
  setInterval(function() {
    crushCandy();
    slideCandy();
    generateCandy();
    checkObjective();
  }, 100);

  // Add event listeners to buttons
  document.getElementById("play-again-button").addEventListener("click", playAgainButtonClicked);
  document.getElementById("next-level-button").addEventListener("click", nextLevelButtonClicked);
}

// Function to return a random candy from the candies array
function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)]; // 0 - 8.99
}

// Game setup function
function startGame() {
  // Start background music
  playBgMusic();

  // Create the game board
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      let tile = document.createElement("img");
      tile.id = y.toString() + "-" + x.toString();
      tile.src = "./images/" + randomCandy() + ".png"; // Set the tile.src to a random candy

      // Add drag event listeners to the tile
      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
}

// Drag start function
function dragStart() {
  // Set the current tile that was clicked on and is being dragged
  currTile = this;
}

// Drag over function
function dragOver(e) {
  e.preventDefault();
}

// Drag enter function
function dragEnter(e) {
  e.preventDefault();
}

// Drag leave function
function dragLeave() {}

// Drag end function
function dragEnd() {
  if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }

  // Get coordinates of current and other tiles
  let currCoords = currTile.id.split("-");
  let y = parseInt(currCoords[0]);
  let x = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let y2 = parseInt(otherCoords[0]);
  let x2 = parseInt(otherCoords[1]);

  // Check if adjacent
  let moveLeft;
  let moveRight;
  let moveDown;
  let moveUp;
  let isAdjacent;

  if (x2 === x - 1 && y2 === y) {
    moveLeft = true;
  }

  if (x2 === x + 1 && y2 === y) {
    moveRight = true;
  }

  if (x2 === x && y2 === y - 1) {
    moveUp = true;
  }

  if (x2 === x && y2 === y + 1) {
    moveDown = true;
  }

  if (moveDown || moveLeft || moveRight || moveUp) {
    isAdjacent = true;
  }

  // Swap candies if adjacent
  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    // If the swap is not valid, revert the candies back
    if (!checkValid()) {
      let currImg = currTile.src;
      let otherImg = otherTile.src;
      currTile.src = otherImg;
      otherTile.src = currImg;
    }
  }
}

// Drag drop function
function dragDrop() {
  otherTile = this;

  // Update moves left and count moves
  if (movesLeft > 0) {
    movesLeft--;
    countMoves++;
  }
}

// Crush candies function
function crushCandy() {
  crushFour();
  crushThree();

  // Update UI with current score, moves left, level, and target score
  document.getElementById("score").innerText = score;
  document.getElementById("moves").innerText = movesLeft;
  document.getElementById("level").innerText = level;
  document.getElementById("goal").innerText = targetScore;
}

// Crush three candies function
function crushThree() {
  // Check rows
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns - 2; x++) {
      let candy1 = board[y][x];
      let candy2 = board[y][x + 1];
      let candy3 = board[y][x + 2];
      if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        playPop();
        score += 10;
      }
    }
  }

  // Check columns
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows - 2; y++) {
      let candy1 = board[y][x];
      let candy2 = board[y + 1][x];
      let candy3 = board[y + 2][x];
      if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        playPop();
        score += 10;
      }
    }
  }
}

// Crush four candies function
function crushFour() {
  // Check rows
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns - 3; x++) {
      let candy1 = board[y][x];
      let candy2 = board[y][x + 1];
      let candy3 = board[y][x + 2];
      let candy4 = board[y][x + 3];
      if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";
        playPlop();
        score += 20;
      }
    }
  }

  // Check columns
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows - 3; y++) {
      let candy1 = board[y][x];
      let candy2 = board[y + 1][x];
      let candy3 = board[y + 2][x];
      let candy4 = board[y + 3][x];
      if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("blank")) {
        candy1.src = "./images/blank.png";
        candy2.src = "./images/blank.png";
        candy3.src = "./images/blank.png";
        candy4.src = "./images/blank.png";
        playPlop();
        score += 20;
      }
    }
  }
}

// Check if a valid move is available function
function checkValid() {
  // Check rows
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns - 2; x++) {
      let candy1 = board[y][x];
      let candy2 = board[y][x + 1];
      let candy3 = board[y][x + 2];
      if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
        return true;
      }
    }
  }

  // Check columns
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows - 2; y++) {
      let candy1 = board[y][x];
      let candy2 = board[y + 1][x];
      let candy3 = board[y + 2][x];
      if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
        return true;
      }
    }
  }

  return false;
}

// Slide candies down function
function slideCandy() {
  for (let x = 0; x < columns; x++) {
    let ind = rows - 1;
    for (let y = columns - 1; y >= 0; y--) {
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

// Generate new candies function
function generateCandy() {
  for (let x = 0; x < columns; x++) {
    if (board[0][x].src.includes("blank")) {
      board[0][x].src = "/images/" + randomCandy() + ".png";
    }
  }
}

// Check game objectives function
function checkObjective() {
  // Check if target score is reached
  if (score >= targetScore) {
    if (level < 4) {
      // Display congrats message
      congrats(score, countMoves);
      playCongrats();
    }
  } 
  // Check if no moves left
  else if (movesLeft <= 0) {
    // Display play again message
    playAgain(score, countMoves);
    playCongrats();
  }
}

// Congrats message function
function congrats(finalScore, numberMoves) {
  const congratsContent = document.getElementById("congrats-content");
  congratsContent.innerText = `You completed the level!\nFinal Score: ${finalScore}\nNumber of Moves: ${numberMoves}`;

  // Show the congrats message and "Next Level" button
  document.getElementById("congrats-message").style.display = "block";
  document.getElementById("next-level-button").style.display = "block";
}

// Play again message function
function playAgain(finalScore, numberMoves) {
  const playAgainContent = document.getElementById("play-again-content");
  playAgainContent.innerText = `You didn't reach the target score. Try again!\nFinal Score: ${finalScore}\nNumber of Moves: ${numberMoves}`;

  // Show the play-again message and "Play Again" button
  document.getElementById("play-again-message").style.display = "block";
  document.getElementById("play-again-button").style.display = "block";
}

// Next level function
function nextLevel() {
  if (level < 4 && score >= targetScore) {
    // Check if the current level is less than the maximum level and the target score is reached
    level++;
    targetMoves -= 2;
    targetScore += 10;

    // Reset the game for the next level
    resetGame();

    // Update UI to reflect the new level, target moves, and target score
    document.getElementById("level").innerText = level;
    document.getElementById("moves").innerText = targetMoves;
    document.getElementById("goal").innerText = targetScore;
  }
}

// Event listener for the play-again button
function playAgainButtonClicked() {
  resetGame();
  
  document.getElementById("play-again-message").style.display = "none";
  document.getElementById("play-again-button").style.display = "none";
}

// Event listener for the next-level button
function nextLevelButtonClicked() {
  nextLevel();
  document.getElementById("congrats-message").style.display = "none";
  document.getElementById("next-level-button").style.display = "none";
}

// Reset game function
function resetGame() {
  // Reset game variables
  score = 0;
  countMoves = 0;
  movesLeft = targetMoves; // Reset moves left for the new game

  // Clear the game board and generate a new one
  clearGameBoard();
  startGame();

  // Update UI to reflect the reset values
  document.getElementById("score").innerText = score;
  document.getElementById("moves").innerText = movesLeft;
  document.getElementById("level").innerText = level;

  document.getElementById("congrats-message").style.display = "none";
  document.getElementById("play-again-message").style.display = "none";
}

// Clear game board function
function clearGameBoard() {
  // Clear the board variable
  board = [];

  // Clear the HTML content of the board element
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = '';
}

// Background music function
function playBgMusic() {
  let backgroundMusic = new Audio("sounds/background-music.mp3");
  backgroundMusic.play();
}

// Sound when 3 candies are crushed
function playPop() {
  let popSound = new Audio("sounds/pop1.ogg");
  popSound.play();
}

// Sound when 4 candies are crushed
function playPlop () {
  let plopSound = new Audio("sounds/plop.ogg");
  plopSound.play();
}

function playCongrats () {
  let congratsSound = new Audio("sounds/congrats.mp3");
  congratsSound.play();

  // Stop the sound after 3 seconds
  setTimeout(function() {
    congratsSound.pause();
    congratsSound.currentTime = 0; // Reset the audio playback to the beginning
  }, 300); // 3000 milliseconds = 3 seconds
}

