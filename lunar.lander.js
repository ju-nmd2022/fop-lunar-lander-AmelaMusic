function setup() {
  createCanvas(750, 750);
  frameRate(30);
  partVelocity = 2;
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
let partVelocity = 2;
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
  }

  //sidefins
  let sidefinY = 35;
  let sidefinX = 0;
  if (hasCrashed) {
    sidefinY = sidefinY + partVelocity;
    sidefinX = sidefinX - partVelocity;
    partVelocity = partVelocity + finacceleration;
  }
  fill(0, 83, 159);
  arc(285, sidefinY, 50 + k, 40 + k, PI, 0, CHORD);

  //body
  let bodyY = 0;
  let bodyX = 0;

  if (hasCrashed) {
    bodyY = bodyY + partVelocity;
    bodyX = bodyX - partVelocity;
    partVelocity = partVelocity + finacceleration + 6;

    push();
    translate(bodyX, bodyY);
    fill(255, 0, 0);
    // source https://www.geeksforgeeks.org/p5-js-arc-function/

    //forst half of the body
    arc(285, bodyY, 35 + k, 80 + k, 0, PI - QUARTER_PI, OPEN);
    pop();

    push();
    translate(-bodyX, bodyY);
    fill(255, 0, 0);

    //fsecond half of the body
    arc(285, bodyY, 35 + k, 80 + k, 0, PI + QUARTER_PI, OPEN);
    pop();
  } else {
    fill(255, 0, 0);
    ellipse(285, bodyY, 35 + k, 80 + k);
  }

  //window
  fill(255);
  let windowY = -12;
  let windowX = 0;
  if (hasCrashed) {
    windowY = -12;
    windowY = windowY + partVelocity;
    windowX = windowX + partVelocity;
    partVelocity = partVelocity + finacceleration;
  }
  ellipse(285 + windowX, windowY, 10 + k, 10 + k);

  //front fin
  let frontfinX = 0;
  let frontfinY = 32;

  if (hasCrashed) {
    frontfinY = frontfinY + partVelocity;
    frontfinX = frontfinX - partVelocity;
    partVelocity = partVelocity + finacceleration;
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

function resultWinScreen() {
  textSize(32);
  fill(53, 94, 59);
  // textStyle(BOLD);
  text(
    "Congrats, you landed!\n\n Click on the screen if you want to play again!",
    375,
    100
  );
}

function resultCrashScreen() {
  textSize(32);
  fill(210, 4, 45);
  // textStyle(BOLD);
  textAlign(CENTER);
  text("Too fast!\n\nClick on the screen to try again", 375, 100);
}

//typewriter effect source: https://gist.github.com/mjvo/2dce29799eb75b7ee1a571380f12ef1b
let message =
  "Click on the screen to start\n\nControll thruster with down-arrow key";
let index = 0;
function startScreen() {
  background(0, 0, 0);
  moon();
  stars();
  ship(100, shipY);
  textSize(32);
  textAlign(CENTER);
  fill(255);
  textStyle(BOLD);
  text(message.substring(0, index), 375, 340);

  if (index < message.length) {
    index++;
    setTimeout(draw, 990);
  }
}

// gravity makes ship fall down
function gameScreen() {
  if (isGameActive) {
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
    partVelocity = 2;
    windowY = -12;
    shipY = 100;
  }
}
