function setup() {
  createCanvas(750, 750);

  finVelocity = 2;
  finacceleration = -2;
  k = 10;
  hasCrashed = false;
  windowY = -12;
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

//modified rocket body and flame from source:https://www.youtube.com/watch?v=cl5FW_zgY_Q
let hasCrashed = false;
let finVelocity = 2;
finacceleration = -2;
let k = 10;
function ship(x, y, showFlames) {
  push();
  translate(x, y);

  if (showFlames && shipY < 600) {
    // Flames
    noStroke();
    fill(255, 185, 0);
    ellipse(285, random(30, 55), 20, 60);
    fill(255, 255, 0);
    ellipse(285, random(30, 50), 15, 40);
  } else if (shipY >= 580 && shipY < 604) {
    // Smoke
    // noStroke();
    // fill(150, 150, 150, 100);
    // ellipse(250, 60, 30, 10);
    // ellipse(260, 70, 25, 8);
    // ellipse(240, 70, 25, 8);
    // ellipse(250, 80, 20, 5);
  }

  //sidefins
  let sidefinY = 35;
  let sidefinX = 0;
  if (hasCrashed) {
    sidefinY = sidefinY + finVelocity;
    sidefinX = sidefinX - finVelocity;
    finVelocity = finVelocity + finacceleration;
  }
  fill(0, 83, 159);
  arc(285, sidefinY, 50 + k, 40 + k, PI, 0, CHORD);

  //body
  let bodyY = 0;
  let bodyX = 0;

  if (hasCrashed) {
    push();
    translate(285 + bodyX, bodyY);
    rotate(radians(-45));
    fill(255, 0, 0);
    rect(-30, -25, 30 + k, 50 + k / 2);
    rect(0, -25, 30 + k, 50 + k / 2);
    pop();
    bodyY = bodyY + finVelocity;
    bodyX = bodyX - finVelocity;
    finVelocity = finVelocity + finacceleration;
  } else {
    // fill(238, 164, 127);
    fill(255, 0, 0);
    ellipse(285 + bodyX, bodyY, 35 + k, 80 + k);
  }

  //window
  fill(255);
  let windowY = -12;
  let windowX = 0;
  if (hasCrashed) {
    // windowY += -100;
    windowY = -12;
    // finVelocity = 2;
    windowY = windowY + finVelocity;
    windowX = windowX + finVelocity;
    finVelocity = finVelocity + finacceleration;
  }
  ellipse(285 + windowX, windowY, 10 + k, 10 + k);

  //front fin
  let frontfinX = 0;
  let frontfinY = 32;
  if (hasCrashed) {
    frontfinY = frontfinY + finVelocity;
    frontfinX = frontfinX - finVelocity;
    finVelocity = finVelocity + finacceleration;

    // rotate(radians(finVelocity * 2));
  }
  fill(0, 83, 159);
  ellipse(285 + frontfinX, frontfinY, +k, 25 + k);

  pop();
}

function crashShip() {
  hasCrashed = true;
}

// source: flappy ufo from canvas example
let shipY = 100;
let velocity = 2;
let acceleration = 0.2;
let isGameActive = true;

function tryAgain() {
  text("Click the screen to try again", 350, 200);
}

function resultWinScreen() {
  textSize(32);
  fill(0, 102, 153);
  text("Congrats, you landed!", 350, 100);
  tryAgain();
}

function resultCrashScreen() {
  textSize(32);
  fill(255, 0, 255);
  textAlign(CENTER);
  text("You Crashed!", 350, 100);
  tryAgain();
}

//typewriter effect source: https://gist.github.com/mjvo/2dce29799eb75b7ee1a571380f12ef1b
let message = "Press the screen to start";
let index = 0;
function startScreen() {
  background(0, 0, 0);
  moon();
  stars();
  ship(100, shipY);
  textSize(32);
  textAlign(CENTER);
  fill(255);
  // text("Press the screen to start", width / 2, height / 2);
  text(message.substring(0, index), width / 2, height / 2);

  if (index < message.length) {
    index++;
    setTimeout(draw, 990);
  }
}

// gravity makes ship fall down
function gameScreen() {
  if (isGameActive) {
    // background(0, 0, 0);
    // moon();
    // stars();
    // ship(100, shipY);
    shipY = shipY + velocity;
    velocity = velocity + acceleration;
  }

  if (keyIsDown(40) && isGameActive) {
    velocity = velocity - 0.7;
    // Show flames when accelerating
    ship(100, shipY, true);
  } else {
    // Otherwise, don't show flames
    ship(100, shipY, false);
  }
  // makes ship stop/land at the moon
  if (shipY > 604 && velocity > 3) {
    isGameActive = false;
    state = "result";
    crashShip();

    resultCrashScreen();
  } else if (shipY > 604 && velocity < 3) {
    isGameActive = false;
    state = "result";

    resultWinScreen();
  }
}

let state = "start";

function draw() {
  background(0);
  stars();
  moon();
  if (state === "start") {
    startScreen();
  }

  if (isGameActive && state === "game") {
    gameScreen();
  } else if (isGameActive == false && state === "result") {
    gameScreen();
  }
}

// source: switching between different states example from lecture
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
    //start the game again
    hasCrashed = false;
    isGameActive = true;
    velocity = 2;
    finVelocity = 2;
    windowY = -12;
    shipY = 100;
  }
}
