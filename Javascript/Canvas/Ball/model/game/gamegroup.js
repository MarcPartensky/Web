class GameGroup {
    static random(n=0) {
        let players = new Map();
        let name;
        for (let i=0; i<n; i++) {
            name = "unnamed"+String(i);
            players.set(name, Player.random(name));
        }
        return new this(players);
    }
    constructor(
        players=new Map(),
        eatingCollider=new EatingCollider(),
        rigidCollider=new RigidCollider(),
        food=[]
    ) {
        this.players = players;
        this.food = food;
        this.eatingCollider = eatingCollider;
        this.rigidCollider = rigidCollider;
    }
    update(dt) {
        for (const player of this.players.values()) {
            player.update(dt);
        }
        this.handleCollisions();
    }
    show(context) {
        for (const player of this.players.values()) {
            player.show(context);
        }
    }
    handleCollisions() {
        this.handleRigidCollisions();
        this.handleEatingCollisions();
    }
    handleRigidCollisions() {
        for (const player of this.players.values()) {
            this.rigidCollider.handle(player.balls);
        }
        // console.log("collisions have been handled");
    }
    handleEatingCollisions() {
        this.eatingCollider.handleEating([...this.players.values()]);
    }
}