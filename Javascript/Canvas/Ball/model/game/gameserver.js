class GameServer extends GameManager {
    constructor(game, dt=0.01) {
        super(game);
        this.dt = dt;
    }
    on(io) {
        io.sockets.on("connection",  function(socket) {
            let name = socket.handshake.query.name;
            if (name=='null') {return;}
            // let id = hash(name+":"+socket.conn.id);
            let id = hash(name);
            let player = new Player(name);
            this.game.map.group.players.set(id, player);
            socket.emit("id", id);
            socket.on("player-spawn", function() {
                this.game.map.group.players.get(id).spawn(this.game.map.vmin, this.game.map.vmax);
                console.log("player spawned")
            }.bind(this));
            socket.on("player-respawn", function() {
                this.game.map.group.players.get(id).spawn(this.game.map.vmin, this.game.map.vmax);
                console.log("player respawned")
            }.bind(this));
            socket.on("control-mousemove", function(position) {
                const direction = Vector.from(position);
                direction.limit(this.game.map.vmin, this.game.map.vmax);
                this.game.map.group.players.get(id).direction = direction;
            }.bind(this));
            socket.on("control-split", function(position) {
                player = this.game.map.group.players.get(id)
                player.split(Vector.from(position || player.direction));
            }.bind(this));
            socket.on("message", function(message) {
                console.log(message);
            }.bind(this));
        }.bind(this));
    }
    update(io, ss) {
        this.game.update();
        this.handleCollisions();
        io.sockets.emit("game-stream", this.game.getStream());
        // io.sockets.emit("game", this.game);
        // io.sockets.emit("group", this.game.map.group);
        // io.sockets.emit("map", this.game.map);
    }
    handleCollisions() {
    }
    loop(io, ss) {
        this.update(io, ss);
    }
    start(io, ss) {
        // const stream = ss.createStream();
        // this.game.pipe(stream);
        console.log("starting the game");
        this.on(io);
    }
    main(io, ss) {
        this.start(io, ss);
        setInterval(this.loop.bind(this), this.dt*1000, io, ss);
    }
}