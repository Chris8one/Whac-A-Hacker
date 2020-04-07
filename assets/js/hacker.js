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
    // Adjusts how far up the hackers will go
    if (this.y < this.startY - 85) {
      // Controls the speed for the hackers to go down
      this.dir = 40;
    }
    if (this.y > this.startY) {
      this.dir = 0;
      this.killed = false;
      this.ready = true;
      this.y = this.startY;
    }
  }

  // Adjusting the speed on the hackers on their way up
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
