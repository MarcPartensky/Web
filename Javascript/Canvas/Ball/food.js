class Food extends Body{
  static radius = 2;
  static random() {
    return new Food(Motion.random(1,2).rsub(1/2).rmul(1000));
  }
   constructor(motion, radius=Food.radius, color=Color.random()) {
     super(motion);
     this.radius = radius;
     this.color = color;
   }
   show(context) {
     context.fillStyle = this.color;
     context.beginPath();
     context.arc(this.x, this.y ,this.radius, 0, 2*Math.PI);
     context.fill();
     context.closePath()
   }
}
