class GameGroup {
    static random(n=10) {
        let players = new Map();
        let name;
        for (let i=0; i<n; i++) {
            name = "unnamed"+String(i);
            players.set(name, Player.random(name));
        }
        return new this(players);

    }
    constructor(players=new Map(), food=[]) {
        this.players = players;
        this.food = food;
    }
    update(dt) {
        for (const player of this.players.values()) {
            player.update(dt);
        }
        // this.handleCollisions();
    }
    show(context) {
        for (const player of this.players.values()) {
            player.show(context);
        }
    }
    handleCollisions() {
        // this.balls.handleCollisions();
        // handleEating
    }
}