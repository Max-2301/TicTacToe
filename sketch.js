function setup() {
  createCanvas(600, 600);
  startGame();
}
function startGame() {
  background(255);
  line(200, 0, 200, 600);
  line(400, 0, 400, 600);
  line(0, 200, 600, 200);
  line(0, 400, 600, 400);
}
let players = ["X", "O"];
let activePlayer = players[0];
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let winnerCheck = false;
let winner = null;
let available = 9;
function mouseClicked() {
  let w = width / 3;
  let h = height / 3;
  let x;
  let y;
  let boardX;
  let boardY;
  let mouseClickedY = mouseY;
  if (winnerCheck == false) {
    if (mouseClickedY < h) {
      y = 100;
      boardY = 0;
    } else if (mouseClickedY > h && mouseClickedY < h * 2) {
      y = 300;
      boardY = 1;
    } else if (mouseClickedY > h * 2) {
      y = 500;
      boardY = 2;
    }
    let mouseClickedX = mouseX;
    if (mouseClickedX < w) {
      x = 100;
      boardX = 0;
    } else if (mouseClickedX > w && mouseClickedX < w * 2) {
      x = 300;
      boardX = 1;
    } else if (mouseClickedX > w * 2) {
      x = 500;
      boardX = 2;
    }
    if (board[boardY][boardX] == "") {
      if (activePlayer == players[0]) {
        circle(x, y, w / 2);
        activePlayer = players[1];
      } else if (activePlayer == players[1]) {
        line(x - w / 4, y - h / 4, x + w / 4, y + h / 4);
        line(x - w / 4, y + h / 4, x + w / 4, y - h / 4);
        activePlayer = players[0];
      }
      board[boardY].splice(boardX, 1, activePlayer);
      available--;
      checkWin();
    }
  }
}
function equals3(a, b, c) {
  return a == b && b == c && a == c;
}
function checkWin() {
  //horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      if (board[i][0] != "" && board[i][1] != "" && board[i][2] != "") {
        winner = board[i][0];
        winnerCheck = true;
      }
    }
  }
  //vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      if (board[0][i] != "" && board[1][i] != "" && board[2][i] != "") {
        winner = board[0][i];
        winnerCheck = true;
      }
    }
  }
  //diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    if (board[0][0] != "" && board[2][2] != "" && board[1][1] != "") {
      winner = board[0][0];
      winnerCheck = true;
    }
  }
  if (equals3(board[0][2], board[1][1], board[2][0])) {
    if (board[0][2] != "" && board[2][0] != "" && board[1][1] != "") {
      winner = board[0][2];
      winnerCheck = true;
    }
  }
  if (winnerCheck == false && available == 0) {
    winScreen();
  }
  if (winnerCheck == true) {
    winScreen();
  }
}
scoreX = 0;
scoreO = 0;
function winScreen() {
  background(255);
  if (winner == "X") {
    line(100, 100, 500, 500);
    line(100, 500, 500, 100);
    scoreX++;
  } else if (winner == "O") {
    circle(300, 300, 500);
    scoreO++;
  }
  if (available == 0 && winnerCheck == false) {
    winner = "None of u losers";
  }
  text(winner + " WON - Press UP ARROW to Restart", 200, 150, 400, 150);
  text("O " + scoreO, 200, 300, 300, 300);
  text("X " + scoreX, 400, 300, 500, 300);
  if (scoreO - scoreX == 5) {
    text("X u suck", 250, 300, 450, 300);
  }
  if (scoreX - scoreO == 5) {
    text("O u suck", 280, 300, 400, 300);
  }
}
function keyPressed(ENTER) {
  if (keyCode === UP_ARROW) {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    winnerCheck = false;
    winner = null;
    available = 9;
    startGame();
  }
}