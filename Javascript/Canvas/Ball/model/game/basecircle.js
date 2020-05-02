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

class BaseCircleGroup {
    constructor(map=new Map()) {
        this.map = map;
    }
    update(dt) {
        this.map.forEach(e => e.update(dt));
    }
    get position() {
        return Vector.average(...Array.from(this.map.values()).map(e => e.position));
    }
    get velocity() {
        return Vector.average(...Array.from(this.map.values()).map(e => e.velocity));
    }
}