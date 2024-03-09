const canvas = document.getElementById("pingPongCanvas");
const context = canvas.getContext("2d");

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  dx: 10,
  dy: 10
};

const paddleHeight = 100;
const paddleWidth = 15;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 10;

let player1Score = 0;
let player2Score = 0;

let player1UpPressed = false;
let player1DownPressed = false;
let player2UpPressed = false;
let player2DownPressed = false;

function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = "white";
  context.fill();
  context.closePath();
}

function drawPaddles() {
  context.fillStyle = "white";
  context.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
  context.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
}

function drawScore() {
  context.font = "30px Arial";
  context.fillStyle = "white";
  context.fillText("Player 1: " + player1Score, 50, 50);
  context.fillText("Player 2: " + player2Score, canvas.width - 250, 50);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddles();
  drawScore();

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  }

  if (
    (ball.x - ball.radius < paddleWidth && ball.y > paddle1Y && ball.y < paddle1Y + paddleHeight) ||
    (ball.x + ball.radius > canvas.width - paddleWidth && ball.y > paddle2Y && ball.y < paddle2Y + paddleHeight)
  ) {
    ball.dx = -ball.dx;
  }

  if (ball.x - ball.radius < 0) {
    player2Score++;
    resetGame();
  } else if (ball.x + ball.radius > canvas.width) {
    player1Score++;
    resetGame();
  }

  if (player1UpPressed && paddle1Y > 0) {
    paddle1Y -= paddleSpeed;
  }
  if (player1DownPressed && paddle1Y < canvas.height - paddleHeight) {
    paddle1Y += paddleSpeed;
  }
  if (player2UpPressed && paddle2Y > 0) {
    paddle2Y -= paddleSpeed;
  }
  if (player2DownPressed && paddle2Y < canvas.height - paddleHeight) {
    paddle2Y += paddleSpeed;
  }

  requestAnimationFrame(draw);
}

function keyDownHandler(e) {
  if (e.key == "w") {
    player1UpPressed = true;
  } else if (e.key == "s") {
    player1DownPressed = true;
  } else if (e.key == "ArrowUp") {
    player2UpPressed = true;
  } else if (e.key == "ArrowDown") {
    player2DownPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "w") {
    player1UpPressed = false;
  } else if (e.key == "s") {
    player1DownPressed = false;
  } else if (e.key == "ArrowUp") {
    player2UpPressed = false;
  } else if (e.key == "ArrowDown") {
    player2DownPressed = false;
  }
}

function resetGame() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

draw();
