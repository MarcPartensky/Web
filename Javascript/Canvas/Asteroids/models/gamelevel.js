class GameLevel {
    constructor() {

    }
    get group() {
        return new SuperGroup();
    }
}


class AsteroidLevel extends GameLevel {
    constructor(n) {
        super();
        this.n = n;
    }
    get group() {
        return new SuperGroup([
            ['asteroidGroup', AsteroidGroup.random(this.n)]
        ]);

    }
    update() {

    }

}