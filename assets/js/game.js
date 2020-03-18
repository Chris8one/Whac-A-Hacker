var hacke;
var kboard;
var hacker_img;
var comp_img;
var hitt = false;

function preload() {
  hacker_img = loadImage("assets/img/hacker.png");
  comp_img = loadImage("assets/img/computer.png");
}

function setup() {
  hacke = new Hacker(50, 100);
}

function draw() {
  createCanvas(900, 600);
  background(200);
  hacke.logic();
  hacke.show();
  image(comp_img, 25, 100, 150, 110);
}

if (hacke.y < 100) {
}
