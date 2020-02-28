class GameGroup extends Group {
    constructor(balls, food) {
        super(balls, food)
    }
    update(dt) {
        this.forEach(t => t.update(dt));
        this.handleCollisions();
    }
    show(context) {
        this.forEach(t => t.show(context));
    }
    get balls() {
        return this[0];
    }
    set balls(value) {
        this[0] = value;
    }
    get food() {
        return this[1];
    }
    set food(value) {
        this[1] = value;
    }
    handleCollisions() {
        this.balls.handleCollisions();
        // handleEating
    }
}