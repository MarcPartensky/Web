class Game {
    constructor(group) {
        this.group = group;
    }
    update(dt) {
        this.group.update(dt);
    }
    show(ctx) {
        this.group.show(ctx);
    }
}