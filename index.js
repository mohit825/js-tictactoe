// Getting all the game buttons.
const BOARD_WIDTH = 3;
let currentPlayer = 1;
let numberOfMoves = 0;
let boardState = generateEmptyBoard();
const gameSquares = document.querySelectorAll(".game-square");
const resetBtn = document.querySelector("#restart-button");
const gameHeading = document.querySelector("#game-heading");

resetBtn.addEventListener("click", resetGame);

// returns row and column of selected square
const getRowCol = (i) => {
  let row = Math.floor(i / BOARD_WIDTH);
  let col = i % BOARD_WIDTH;
  return { row, col };
};

// Set the heading for current player
function setCurrentPlayerHeading() {
  gameHeading.textContent = `Player ${currentPlayer}'s Turn`;
}

// Winning Conditions here
function didSomeWin() {
  let rows = [0, 1, 2];
  let cols = [0, 1, 2];
  let winHorizontaly = rows.some((row) => {
    return (
      boardState[row][0] === currentPlayer &&
      boardState[row][1] === currentPlayer &&
      boardState[row][2] === currentPlayer
    );
  });

  let winVertically = cols.some((col) => {
    return (
      boardState[0][col] === currentPlayer &&
      boardState[1][col] === currentPlayer &&
      boardState[2][col] === currentPlayer
    );
  });

  let TopLeftDiagonal =
    boardState[0][0] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][2] === currentPlayer;

  let TopRightDiagonal =
    boardState[0][2] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][0] === currentPlayer;

  return winHorizontaly || winVertically || TopLeftDiagonal || TopRightDiagonal;
}

const makeMove = (gameSquare, row, col) => {
  console.log(gameSquare, row, col);
  gameSquare.textContent = currentPlayer === 1 ? "X" : "O";
  gameSquare.disabled = true;
  boardState[row][col] = currentPlayer;
  numberOfMoves++;

  if (didSomeWin()) {
    gameHeading.textContent = `Player ${currentPlayer} Won!`;
    endGame();
  } else if (numberOfMoves >= BOARD_WIDTH * BOARD_WIDTH) {
    gameHeading.textContent = `Tie Game!`;
    endGame();
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayerHeading();
  }
};

gameSquares.forEach((gameSquare, index) => {
  gameSquare.addEventListener("click", () => {
    let { row, col } = getRowCol(index);
    makeMove(gameSquare, row, col);
  });
});

// this will generate an empty board of 2d matrix
function generateEmptyBoard() {
  return new Array(BOARD_WIDTH).fill().map(() => {
    return new Array(BOARD_WIDTH).fill();
  });
}

function resetGame() {
  currentPlayer = 1;
  setCurrentPlayerHeading();
  gameSquares.forEach((gameSquare) => (gameSquare.textContent = ""));
  resetBtn.style.display = "none";
  numberOfMoves = 0;
  boardState = generateEmptyBoard();
  gameSquares.forEach((gameSquare) => {
    gameSquare.disabled = false;
  });
}

function endGame() {
  resetBtn.style.display = "block";
  gameSquares.forEach((gameSquare) => {
    gameSquare.disabled = true;
  });
}
