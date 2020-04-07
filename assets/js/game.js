var splatTimer; // Timer for the blood splat
var hacke = []; // Array to generate the hackers
var crosshair;
var hacker_img;
var comp_img = []; // Array to generate the computers
var rand;
var signal;
var backgr;
var splat;
var score = 0;
var bloodX;
var bloodY;
var dir; // Directs to each section
var timer; // Works with frameCount
var round; // The length of the game
var highScore; //To show the score on scorePage

function preload() {
  hacker_img = loadImage("assets/img/hacker.png");
  comp_img = loadImage("assets/img/computer.png");
  crosshair = loadImage("assets/img/crosshair.png");
  backgr = loadImage("assets/img/matrix.jpg");
  splat = loadImage("assets/img/splat.png");
}

function setup() {
  createCanvas(900, 600);
  // Screen location of the hackers
  for (var i = 0; i < 3; i++) {
    hacke[i] = new Hacker(i * 300 + 95, 150);
  }
  for (var i = 3; i < 5; i++) {
    hacke[i] = new Hacker((i - 2) * 310 - 60, 400);
  }

  dir = "startPage";

  round = 1200;
  highScore = 0;
}

function draw() {
  image(backgr, 0, 0);
  switch (dir) {
    case "startPage":
      startPage();
      break;
    case "game":
      game();
      break;
    case "scorePage":
        scorePage();
        break;
  }
  // The aim and it's position adjusted to the regular mouse pointer
  image(crosshair, mouseX - 32, mouseY - 32, 64, 64);
}

function brain() {
  signal = int(random(5));
  if (hacke[signal].ready) {
    hacke[signal].go();
  }
}

function mousePressed() {
  if (dir == "game") {
    // How big area over the hacker the game will register a hit
    for (var i = 0; hacke.length; i++) {
      if (
        !hacke[i].ready &&
        !hacke[i].killed &&
        mouseX < hacke[i].startX + 80 &&
        mouseX > hacke[i].startX &&
        mouseY < hacke[i].startY &&
        mouseY > hacke[i].startY - 100
      ) {
        // Registers when a hacker is hit and puts it to your score
        score += 1;
        hacke[i].killed = true;
        hacke[i].dir = 100;
        splatTimer = frameCount;
        bloodX = hacke[i].startX + 10;
        bloodY = hacke[i].startY - 80;
      }
    }
  }
  if (dir == "startPage") {
    dir = "game";
    timer = frameCount;
  }
  if (dir == "scorePage") {
    if (mouseX > 20 && mouseX < 305 && mouseY > 30 && mouseY < 58) {
        score = 0;
        dir = "game";
        timer = frameCount;
    } 
  }
  if (dir == "startPage") {
      timer = frameCount;
      highScore = score;
  }

}

// The main screen for the game
function startPage() {
    push();
  textSize(45);
  textAlign(CENTER);
  textFont("Courier New");
  text("Click to start!", width / 2, height / 2);
  pop();
  // Screen location of the computers
  for (var i = 0; i < 3; i++) {
    image(comp_img, i * 300 + 70, 150, 150, 100);
  }
  for (var i = 3; i < 5; i++) {
    image(comp_img, (i - 2) * 310 - 85, 400, 150, 100);
  }
}

// The game itself
function game() {
  if (frameCount - timer > round) {
      dir = "scorePage";
  }
  for (var i = 0; i < hacke.length; i++) {
    hacke[i].show();
    hacke[i].logic();
  }
  // Location of the computers
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
  
  // The score text
  strokeWeight(0);
  textFont("Courier New");
  textSize(30);
  for (var i = 0; i < hacke.length; i++) {
    text("Your score is: " + score, 20, 40);
  }
  // The blood splat's position when a hacker is hit
  if (frameCount - splatTimer < 10) {
    image(splat, bloodX, bloodY, 100, 100);
  }
  // Removes the regular mouse pointer in the game
  noCursor();
}

// The "Game Over" screen
function scorePage() {
    
    push();
    textAlign(LEFT);
    textSize(20);
    text("Click here to play again", 24, 50);
    strokeWeight(1);
    stroke(0);
    noFill();
    rect(20, 30, 295, 28);
    pop();
    push();
    textAlign(CENTER);
    textSize(45);
    text("Your score:" + score, width / 2, height /2);
    text("Click to play again");
    pop();
}
