class Virus extends BaseCircle {
    static color = "#00ff00";
    static radius = 300;
    static maxRadiusRatio = 2;
    static random() {
        return new this(Vector.random());
    }
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

class VirusGroup extends BaseCircleGroup {
    static random(n) {
        const map = new Map();
        for (let i=0; i<n; i+=1) {
            map.set(String(i), Virus.random());
        }
        return new this(map);
    }
    show(context) {
        this.map.forEach(f => f.show(context));
    }
    update(dt) {
        this.map.forEach(f => f.update(dt));
    }
}