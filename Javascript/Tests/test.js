class Boid {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector();
    this.acceleration = createVector();
  }

  show() {
    strokeWeight(16);
    stroke(255);
    PointerEvent(this.position.x, this.position.y);
  }
}
