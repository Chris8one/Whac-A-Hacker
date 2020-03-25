class Hacker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.ready = true;
    this.dir = 0;
    this.killed = false;
  }

  logic() {
    this.y += this.dir;

    if (this.y < this.startY - 85) {
      this.dir = 3.5;
    }
    if (this.y > this.startY) {
      this.dir = 0;
      this.killed = false;
      this.ready = true;
      this.y = this.startY;
    }
  }

  go() {
    if (this.ready) {
      this.dir = -2;
      this.ready = false;
    }
  }

  show() {
    image(hacker_img, this.x, this.y, 100, 90);
  }
}
