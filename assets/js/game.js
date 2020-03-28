var splatTimer;
var gameTimer;
var hacke = [];
var crosshair;
var hacker_img;
var comp_img = [];
var hitt = false;
var rand;
var signal;
var backgr;
var splat;
var score = 0;
var bloodX;
var bloodY;
var btn;
var go;

function preload() {
  hacker_img = loadImage("assets/img/hacker.png");
  comp_img = loadImage("assets/img/computer.png");
  crosshair = loadImage("assets/img/crosshair.png");
  backgr = loadImage("assets/img/matrix.jpg");
  splat = loadImage("assets/img/splat.png");
}

function setup() {
  for (var i = 0; i < 3; i++) {
    hacke[i] = new Hacker(i * 300 + 95, 150);
  }
  for (var i = 3; i < 5; i++) {
    hacke[i] = new Hacker((i - 2) * 310 - 60, 400);
  }
  go = false;
  btn = createButton("Play Game");
}

if (!go) {
  text("Press the Play button to start the game.", 50, height / 2);
}

function draw() {
  createCanvas(900, 600);
  image(backgr, 0, 0);
  for (var i = 0; i < hacke.length; i++) {
    hacke[i].show();
    hacke[i].logic();
  }
  for (var i = 0; i < 3; i++) {
    image(comp_img, i * 300 + 70, 150, 150, 100);
  }
  for (var i = 3; i < 5; i++) {
    image(comp_img, (i - 2) * 310 - 85, 400, 150, 100);
  }
  rand = random(200);
  if (rand < 3) {
    brain();
  }
  image(crosshair, mouseX - 32, mouseY - 32, 64, 64);
  strokeWeight(0);
  textFont("Courier New");
  textSize(30);
  for (var i = 0; i < hacke.length; i++) {
    text("Your score is: " + score, 10, 40);
  }
  if (frameCount - splatTimer < 10) {
    image(splat, bloodX, bloodY, 100, 100);
  }
  noCursor();
}

function brain() {
  signal = int(random(5));
  if (hacke[signal].ready) {
    hacke[signal].go();
  }
}

function mousePressed() {
  for (var i = 0; hacke.length; i++) {
    if (
      !hacke[i].ready &&
      !hacke[i].killed &&
      mouseX < hacke[i].startX + 80 &&
      mouseX > hacke[i].startX &&
      mouseY < hacke[i].startY &&
      mouseY > hacke[i].startY - 100
    ) {
      score += 1;
      hacke[i].killed = true;
      hacke[i].dir = 100;
      splatTimer = frameCount;
      bloodX = hacke[i].startX + 10;
      bloodY = hacke[i].startY - 80;
    }
  }
}

function startGame() {
  go = true;
}
