class GameClient {
    static movement = {up: false, down: false, right: false, left: false, zoomin: false, zoomout: false};
    static backgroundColor = "#000000";
    static notconnected = 0;
    static choosingmap = 1;
    static playing = 2;

    static addEventListeners(gameClient) {
        window.addEventListener("keydown", evt => gameClient.onKeyDown(evt));
        window.addEventListener("keyup", evt => gameClient.onKeyUp(evt));
        window.addEventListener("mousemove", evt => gameClient.onMouseMotion(evt));
    }
    static deactivate() {
        // prevent default actions from space and arrow keys
        window.addEventListener("keydown", function(e) {
          if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
              e.preventDefault();
          }
        }, false);
    }
    static fromCanvas(game, socket, canvas) {
        var context = canvas.getContext("2d");
        context = new ContextAdapter(context);
        return new this(game, socket, context);
    }
    constructor(
        game,
        socket,
        context,
        name,
        state=0,
        movement=GameClient.movement,
        backgroundColor=GameClient.backgroundColor
    ) {
        this.game = game;
        this.socket = socket;
        this.context = context;
        this.name = name;
        this.movement = movement;
        this.backgroundColor = backgroundColor;
        this.mouse = Vector.zero2D;
    }
    on() {
        this.socket.on("id", function(id) {
            this.id = id;
            console.log("id", this.id);
        }.bind(this));
        this.socket.on("game", function(game) {
            this.game = game;
            console.log("game sent", game);
        }.bind(this));
        this.socket.on("map", function(stream) {
            this.game.map = JSON.parse(stream, Game.reviver);
            console.log("map");
        }.bind(this));
        this.socket.on("test", function(message) {
            console.log(message);
        }.bind(this));
        this.socket.on("playerGroup", function(stream) {
            this.game.map.group.playerGroup = JSON.parse(stream, Game.reviver);
        }.bind(this));
        this.socket.on("superGroup", function(stream) {
            this.game.map.group = JSON.parse(stream, Game.reviver);
        }.bind(this));
        this.socket.on("cache", function (cache) {
            console.log("cache detected")
            cache = JSON.parse(cache, Game.reviver);
            this.game.map.group.handleCache(cache);
        }.bind(this));
    }
    resize(window) {
        this.context.width = window.innerWidth;
        this.context.height = window.innerHeight;
    }

    // uses socket to communicate with the server
    communicate() {

    }
    show() {
        this.clear();
        let player = this.game.map.group.playerGroup.map.get(this.id);
        if (player) {
            this.context.plane.position = player.position;
        }
        this.game.show(this.context);
    }
    clear() {
        this.context.fillStyle = this.backgroundColor;
        this.context.clear();
      }
    update() {
        this.context.plane.location.update();
        this.context.plane.units.update();
        this.move();
        this.game.update(this.dt);
        let player = this.game.map.group.playerGroup.map.get(this.id);
        if (player) {
            if (!player.alive) {
                console.log("you are dead");
                this.socket.emit("player-respawn");
            }
        }
        
        if ('id' in this) {
            this.game.map.group.collideClient(this.id);
        }
        if (this.game.map.group.cache.size>0) { // could overrun the server
            this.socket.emit(
                "cache",
                JSON.stringify(this.game.map.group.cache, Game.replacer)
            );
            this.game.map.group.cache.clear();
        }
        this.socket.emit("control-mousemove", this.context.fromScreen(this.mouse));
    }
    onKeyDown(evt) {
        switch(evt.keyCode){
            case 39: // Arrow Right
                this.movement.right = true;
                break;
            case 37: // Arrow Left
                this.movement.left = true;
                break;
            case 40: // Arrow Up
                this.movement.up = true;
                break;
            case 38: // Arrow Down
                this.movement.down = true;
                break;
            case 16: // Left and Right shift
                if (evt.location == 1) {
                    this.movement.zoomout = true;
                } else {
                    this.movement.zoomin = true;
                }
                break;
            case 32:
                this.socket.emit("control-split", this.mouse);
                break;
            }
    }
    onKeyUp(evt) {
        switch(evt.keyCode) {
            case 39: // Arrow Right
                this.movement.right = false;
                break;
            case 37: // Arrow Left
                this.movement.left = false;
                break;
            case 40: // Arrow Up
                this.movement.up = false;
                break;
            case 38: // Arrow Down
                this.movement.down = false;
                break;
            case 16:
                if (evt.location == 1) {
                    this.movement.zoomout = false;
                } else {
                    this.movement.zoomin = false;
                }
                break;
        }
    }
    onMouseMotion(evt) {
        this.mouse = new Vector(evt.x, evt.y);
    }

    move() {
    if (this.movement.up) {
        this.context.plane.y += this.context.plane.speed/this.context.plane.ux;
    }
    if (this.movement.down) {
        this.context.plane.y -= this.context.plane.speed/this.context.plane.uy;
    }
    if (this.movement.left) {
        this.context.plane.x -= this.context.plane.speed/this.context.plane.ux;
    }
    if (this.movement.right) {
        this.context.plane.x += this.context.plane.speed/this.context.plane.uy;
    }
    if (this.movement.zoomin) {
        this.context.plane.units[0].irmul(1.1);
    }
    if (this.movement.zoomout) {
        this.context.plane.units[0].irmul(0.9);
    }
    }
    loop() {
        this.update();
        this.show();
        requestAnimationFrame(this.loop.bind(this));
    }
    start() {
        this.socket.emit("player-spawn", {});
    }
    
    main() {
        this.start();
        // setInterval(this.loop.bind(this), this.dt*1000);
        // setInterval(this.show.bind(this), this.dt)
        this.loop();
    }
}