class Game {
  static dt = 0.005;
  static font = "Arial";
  static index = 0;
  static maps = [];
  static precision = 5;
  static types = [
    Player, PlayerGroup,
    Virus, VirusGroup,
    Food, FoodGroup,
    Ball, BallGroup,
    GameMap, SuperGroup,
  ]
  static reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
      if (value.type === 'Map') {
        return new Map(value.value);
      }
      else if (value.type === 'Vector') {
        return new Vector(...value.value);
      }
      else if (value.type === 'Motion') {
        return new Motion(...value.value);
      }
      else {
        for (const type of Game.types) {
          if (value.type === type.name) {
            return Object.assign(new type(), value.value);
          }
        }
      }
    }
    return value;
  }

  static replacer(key, value) {
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
    } else if (typeof a == 'number') {
      return Math.round(number*10**2, 2)/10**2;
    } else {
      for (const type of Game.types) {
        if (originalObject instanceof type) {
          return {
            type : type.name,
            value: {...originalObject}
          };
        }
      }
      return value;
    }
  }

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
    // console.log(this.map);
    this.map.update(this.dt);
  }
  show(context) {
    this.map.show(context);
  }
  // getPlayerGroupStream() {
  //   const stream = JSON.stringify(this.map.group.playerGroup, this.replacer);
  //   return stream;
  // }
  // setPlayerGroupStream(stream) {
  //   this.map.group.playerGroup = JSON.parse(stream, this.reviver);
  // }
  // getSuperGroupStream() {
  //   return JSON.stringify(this.map.group, this.replacer);
  // }
  // setSuperGroupStream(stream) {
  //   tihs.map.group = JSON.parse(stream, this.reviver);
  // }
}
