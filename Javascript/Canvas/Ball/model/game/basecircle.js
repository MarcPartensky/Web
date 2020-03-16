class BaseCircle {
    constructor(radius) {
        this.radius = radius;
    }
    get mass() {
        return Math.PI*this.radius**2;
    }
    set mass(value) {
        this.radius = Math.sqrt(value)/Math.PI
    }
    contains(position) {
        return this.position.sub(position).norm < this.radius;
      }
    collide(other) {
        return this.position.sub(other.position).norm < this.radius+other.radius;
    }
}

class BaseCircleGroup extends BaseGroup {
}