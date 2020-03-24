function brain() {
  this.signal = int(random(3));
  for (i = 0; i < hacke.length; i++) {
    if (hacke[i].y < 11 && i == this.signal) {
      hacke[i].go();
    }
  }
}
