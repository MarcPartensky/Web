class GameServer extends GameManager {
    // Communicate with the clients.
    on(io) {
        io.sockets.on("connection", function(socket, name) {
            this.socket.on("new player", function() {
                let id = Math.random();
                let player = new Player(name, id);
                this.players.push(player);
                this.socket.emit("id", id);
            }.bind(this));
            this.socket.on("mousemove", function() {
    
            })
    
        }.bind(this));
    }
    communicate() {

    }
    update() {
        this.game.update();
    }
    main() {
        while (this.open) {
            this.update();
            this.communicate();
        }
    }
}