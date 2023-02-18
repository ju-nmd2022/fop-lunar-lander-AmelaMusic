function setup() {
  createCanvas(750, 750);
}

// function backGround() {
//   background(0, 0, 0);
// }

// backGround();

// white oon with different shades of grey cirkles
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

// moon();

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

// stars();

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

// gravitation makes ship fall down

function draw() {
  background(0, 0, 0);
  moon();
  stars();
  ship(100, shipY);
  shipY = shipY + velocity;
  velocity = velocity + acceleration;
}

let isGameActive = true;
// acceleration = 0.1;
function draw() {
  background(0, 0, 0);
  moon();
  stars();
  ship(100, shipY);

  if (isGameActive) {
    shipY = shipY + velocity;
    velocity = velocity + acceleration;
  }

  if (keyIsDown(40)) {
    velocity = velocity - 0.7;
  }

  // makes ship stop/land at the moon
  if (shipY > 590) {
    isGameActive = false;
    // console.log("CRASH!");
  }
}
