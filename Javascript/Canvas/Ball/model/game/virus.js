class Virus extends BaseCircle {
    static color = "#00ff00";
    static radius = 300;
    static maxRadiusRatio = 2;
    constructor(position=Vector.zero2D, radius=Virus.radius) {
        super(radius);
        this.position = position;
    }
    show(context) {
        context.fillStyle = Virus.color;
        context.beginPath();
        context.arc(...this.position, this.radius, 0, 2*Math.PI);
        context.fill();
        context.strokeStyle = Color.darken(color);
        context.arc(...this.position, this.radius, 0, 2*Math.PI);
        context.stroke();
        context.closePath();
    }
}