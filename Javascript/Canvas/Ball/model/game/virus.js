class Virus extends BaseCircle {
    static color = "#00ff00";
    static massColor = "#ffffff";
    static radius = 8;
    static maxRadiusRatio = 2;
    static random() {
        return new this(Vector.random().rsub(0.5).rmul(GameMap.size));
    }
    constructor(position=Vector.zero2D, radius=Virus.radius) {
        super(radius);
        this.position = position;
    }
    get x() {
        return this.position[0];
      }
    set x(v) {
        this.position[0] = v;
    }
    get y() {
        return this.position[1];
    }
    set y(v) {
        this.position[1] = v;
    }
    get mass() {
        return Math.PI * this.radius**2;
    }
    set mass(value) {
        this.radius = Math.sqrt(value/Math.PI);
    }
    show(context) {
        this.showCircle(context);
        this.showMass(context);
    }
    showCircle(context) {
        context.fillStyle = Virus.color;
        context.beginPath();
        context.arc(...this.position, this.radius, 0, 2*Math.PI);
        context.fill();
        context.strokeStyle = Color.darken(Virus.color);
        context.arc(...this.position, this.radius, 0, 2*Math.PI);
        context.stroke();
        context.closePath();
    }
    showMass(context, k=0.3) {
        const size = this.radius/2;
        context.textSize = size;
        context.fillStyle = Virus.massColor;
        const mass = String(Math.floor(this.mass));
        context.fillText(mass, this.x-k*size*mass.length, this.y);
    }
}

class VirusGroup extends BaseCircleGroup {
    static number = 20;
    static random(n=this.number) {
        const map = new Map();
        for (let i=0; i<n; i+=1) {
            map.set("Virus:"+String(i), Virus.random());
        }
        return new this(map);
    }
    show(context, color) {
        this.map.forEach(f => f.show(context, color));
    }
    update(dt) {
        this.map.forEach(f => f.update(dt));
    }
}