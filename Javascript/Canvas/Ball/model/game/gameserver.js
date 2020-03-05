class GameServer extends GameManager {
    // Communicate with the clients.
    constructor(game, open=true, dt=0.01) {
        super(game);
        this.open = open;
    }
    on(io) {
        io.sockets.on("connection",  function(socket, name) {
            let id = Math.random();
            let player = Player.random();
            this.game.map.group.players.set(id, player);
            socket.emit("id", id);
            socket.on("new-player", function(name) {
                this.game.map.group.players[id] = name;
            }.bind(this));
            socket.on("control-mousemove", function(position) {
                // this.game.map.group.players[id].follow(position);

            }.bind(this));
            socket.on("control-split", function(position) {
                // this.game.map.group.players[id].split(position);
            }.bind(this));
            socket.on("message", function(message) {
                console.log(message);
            }.bind(this));
        }.bind(this));
    }
    update(io, ss) {
        this.game.update();
        // io.sockets.emit("game", this.game);
        io.sockets.emit("group", this.game.map.group);
        // io.sockets.emit("map", this.game.map);
    }
    loop(io, ss) {
        while (this.open) {
            this.update(io, ss);
        }
    }
    start(io, ss) {
        // const stream = ss.createStream();
        // this.game.pipe(stream);
        this.on(io);
        setInterval(function () {
            io.sockets.emit("game", SON.stringify(this.game))
        }.bind(this), this.dt);
    }
    main(io, ss) {
        this.start(io, ss);
        this.loop(io, ss);
        setTimeout(100);
    }
}