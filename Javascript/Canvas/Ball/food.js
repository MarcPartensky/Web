class Food {
  static scale = 1;
  static random(n=this.scale) {
    return new Food(n*Vector.random(), Color.random());
  }
   constructor(position, color) {
     this.position = position;
     this.color = color;
   }
   show(context) {
     context.arc(this.x, y ,r, 0, math.pi)

   }
}
