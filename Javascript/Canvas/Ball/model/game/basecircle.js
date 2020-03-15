class BaseCircle {
    constructor(radius) {
        this.radius = radius;
    }
    contains(position) {
        return this.position.sub(position).norm < this.radius;
      }
    collide(other) {
        return this.position.sub(other.position).norm < this.radius+other.radius;
    }
}