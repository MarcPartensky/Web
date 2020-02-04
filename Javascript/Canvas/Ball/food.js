class Food extends Body{
  static scale = 1;
  static random(n=this.scale) {
    return new Food(Motion.random().mul(n), Color.random());
  }
   constructor(motion, color) {
     super(motion);
     this.color = color;
   }
   show(context) {
     context.arc(this.x, this.y ,r, 0, 2*Math.PI);
   }
}
