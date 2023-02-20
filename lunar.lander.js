function setup() {
  createCanvas(750, 750);
}

// white moon with different shades of grey cirkles
function moon() {
  push();

  fill(232, 233, 235);
  //the white rectangle (moon)
  rect(0, 650, width, 100);

  fill(211, 211, 211);
  noStroke();
  ellipse(500, 720, 50, 50);
  ellipse(100, 677, 35, 20);
  ellipse(400, 690, 15, 10);
  ellipse(3, 700, 35, 20);

  fill(128, 128, 128);
  ellipse(660, 664, 35, 20);

  fill(169, 169, 169);
  ellipse(320, 705, 40, 30);
  ellipse(200, 735, 80, 30);
  pop();
}

function stars() {
  push();
  fill(255, 255, 255);
  ellipse(20, 20, 3);
  ellipse(366, 400, 2);
  ellipse(250, 400, 1);
  ellipse(650, 287, 5);
  ellipse(12, 432, 3);
  ellipse(2, 10, 2);
  ellipse(400, 99, 2);
  ellipse(300, 321, 3);
  ellipse(150, 28, 4);
  ellipse(170, 200, 3);
  ellipse(550, 10, 3);
  ellipse(580, 200, 3);
  ellipse(522, 38, 4);
  ellipse(632, 253, 2);
  ellipse(283, 125, 3);
  ellipse(300, 362, 2);
  ellipse(400, 250, 3);
  ellipse(100, 362, 2);
  pop();
}

function ship(x, y) {
  push();
  translate(x, y);
  fill(255, 255, 255);
  rect(250, 0, 20, 60);
  pop();
}

let shipY = 100;
let velocity = 2;
let acceleration = 0.2;

let isGameActive = true;

function tryAgain() {
  text("Click to try again", 350, 200);
}

function resultWinScreen() {
  textSize(32);
  fill(0, 102, 153);
  text("you landed!", 350, 100);
  tryAgain();
}

function resultCrashScreen() {
  textSize(32);
  fill(255, 0, 255);
  text("You Crashed!", 350, 100);
  tryAgain();
}

function startScreen() {
  textSize(32);
  textAlign(CENTER);
  fill(255);
  text("Press the screen to start", width / 2, height / 2);
}

// gravity makes ship fall down
function gameScreen() {
  if (isGameActive) {
    background(0, 0, 0);
    moon();
    stars();
    ship(100, shipY);
    shipY = shipY + velocity;
    velocity = velocity + acceleration;
  }

  if (keyIsDown(40) && isGameActive) {
    velocity = velocity - 0.7;
  }
  // makes ship stop/land at the moon
  if (shipY > 590 && velocity > 3) {
    isGameActive = false;
    state = "result";

    resultCrashScreen();
  } else if (shipY > 590 && velocity < 3) {
    isGameActive = false;
    state = "result";
    resultWinScreen();
  }
}

let state = "start";

function draw() {
  if (state === "start") {
    startScreen();
  }

  if (isGameActive && state === "game") {
    gameScreen();
  } else if (isGameActive == false && state === "result") {
    gameScreen();
  }
}

// changes states when screen is clicked with the mouse.
// Allows you to start and restart the game
function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "game" && isGameActive == false) {
    state = "result";
    isGameActive = true;
    velocity = 2;
    shipY = 100;
  } else if (state === "result") {
    state = "game";
    isGameActive = true;
    velocity = 2;
    shipY = 100;
  }
}
