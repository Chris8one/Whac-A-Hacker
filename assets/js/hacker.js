class Hacker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.count = 0;
    this.dir = -1.5;
  }

  logic() {
    this.y += this.dir;

    if (this.y < 10) {
      this.dir *= -1;
    }
    if (this.y > 100) {
      this.dir = 0;
      this.count += 1;
      if (this.count > 100) {
        this.count = 0;
        this.dir = -1.5;
      }
    }
  }
  show() {
    image(hacker_img, this.x, this.y, 100, 100);
  }
}
