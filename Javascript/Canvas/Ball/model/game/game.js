class Game {
  static dt = 0.1;
  static font = "Arial";
  static index = 0;
  static maps = [];
  static precision = 5;
  static random(n=10) {
    return new this([GameMap.random(n)]);
  }
  constructor(
    maps=Game.maps,
    dt=Game.dt,
    font=Game.font,
    index=Game.index,
    open=Game.open,
    precision=Game.precision
  ) {
    this.maps = maps;
    this.dt = dt;
    this.font = font;
    this.index = index;
    this.open = open;
    this.map = this.maps[this.index];
    this.precision = precision;
  }
  updateMap() {
    this.map = this.maps[this.index];
  }
  update() {
    this.map.update(this.dt);
  }
  show(context) {
    this.map.show(context);
  }
  getStream() {
    function replacer(key, value) {
      const originalObject = this[key];
      if(originalObject instanceof Map) {
        return {
          type: 'Map',
          value: Array.from(originalObject.entries()), // or with spread: value: [...originalObject]
        };
      } else if (originalObject instanceof Vector) {
        return {
          type: 'Vector',
          value: Array.from(originalObject.round(2))
        };
      } else if (originalObject instanceof Motion) {
        return {
          type: 'Motion',
          value: Array.from(originalObject.round(2))
        };
      } else {
        return value;
      }
    }
    return JSON.stringify(this.map, replacer);
  }
  // setStream(stream) {
  //   this.map = JSON.parse(stream);
  // }
  setStream(stream) {
    function reviver(key, value) {
      if(typeof value === 'object' && value !== null) {
        if (value.type === 'Map') {
          return new Map(value.value);
        }
        if (value.type === 'Vector') {
          return new Vector(...value.value);
        }
        if (value.type === 'Motion') {
          return new Motion(...value.value);
        }
      }
      return value;
    }
    // let balls;
    // let position, velocity;
    // let motion;
    // let direction;
    // console.log(stream);
    // this.map.group.playerGroup.map = new Map();
    // this.map.group.foodGroup.map = new Map();
    // this.map.group.virusGroup.map = new Map();

    this.map = JSON.parse(stream, reviver);
  //   const players = new Map(JSON.parse(stream));
  //   for (const [id, player] of players) {
  //     balls = [];
  //     for (const ball of player.balls) {
  //       position = Vector.from(ball.motion[0]);
  //       velocity = Vector.from(ball.motion[1]);
  //       motion = new Motion(position, velocity);
  //       balls.push(new Ball(motion, Math.PI * ball.radius**2));
  //     }
  //     direction = Vector.from(player.direction);
  //     this.map.group.players.set(
  //       id, 
  //       new Player(player.name, player.color, balls, direction));
  //   }
  }
}
