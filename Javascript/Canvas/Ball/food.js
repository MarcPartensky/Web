class Food {
  static scale = 1;
  static random(n=this.scale) {
    return new Food(n*Vector.random(), Color.random());
  }
   constructor(position, color) {
     this.position = position;
     this.color = color;
   }
}
