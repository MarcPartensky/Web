class Ball extends Body {
    static mass = 100;
    static name = "unnamed";
    static alive = true;

    static random(name=this.name, color=undefined) {
        const motion = Motion.random(2,2).rsub(1/2);
        motion[0].irmul(1000);
        motion[1].irmul(0.1);
        return this.from(motion, name, color);
    }
    static from(
        motion,
        name=this.name,
        color=Color.random(),
        alive=this.alive,
        mass=this.mass
    ) {
        let b = this.of(motion);
        b.name = name;
        b.circle = new Circle(motion.position, Math.sqrt(mass/Math.PI), undefined, undefined, color);
        b.alive = alive;
        return b;
    }
    get radius() {
        return this.circle.radius;
    }
    set radius(value) {
        this.circle.radius = value;
    }
    get mass() {
        return Math.PI * this.circle.radius**2;
    }
    set mass(value) {
        this.circle.radius = Math.sqrt(value/Math.PI);
    }
    get color() {
        return this.circle.color;
    }
    get strength() {
        return this.radius;
    }
    spawn(position) {

    }
    die() {
        this.alive = false;
    }
    update(dt) {
        this.circle.center = this.motion.position;
        super.update(dt);
    }
    updateMass(rate) {
        this.circle.radius *= (1-rate);
    }
    canEat(ball, quotient) {
        if (this[0][0].sub(ball[0][0]).norm > this.radius) {return false};
        if (this.circle.radius/ball.circle.radius < quotient) {return false};
        return false;
        // return true;

    }
    eat(ball) {
        this.mass = this.mass + ball.mass;
        ball.mass = 0;
        ball.alive = false;
    }
    show(context) {
        this.showCircle(context);
        this.showText(context);
      }
    showCircle(context) {
        context.fillStyle = this.circle.color;
        context.beginPath();
        context.arc(...this[0][0], this.radius, 0, 2*Math.PI);
        context.fill();
        context.strokeStyle = Color.darken(this.circle.color);
        context.arc(...this[0][0], this.radius, 0, 2*Math.PI);
        context.stroke();
        context.closePath();
    }
    showText(context, k=0.3, mg=3, color="#ffffff") {
        const size = this.circle.radius/2;
        context.textSize = size;
        context.fillStyle = color;
        context.fillText(this.name, this.x-k*size*this.name.length, this.y);
        const mass = String(this.mass).split(".")[0];
        context.fillText(mass, this.x-k*size*mass.length, this.y+k*size*mg);
    }
    
    contains(position) {
        return this.circle.contains(position);
    }
    collide(other) {
        return this.circle.collide(other.circle);
    }
    split(vector) {
        this.mass = this.mass/2;
        const motion = new Motion(this.position, this.velocity.add(vector));
        return new Ball(motion, this.name, this.mass, this.color, this.alive);
    }
    limit(vmin, vmax) {
        this[0][0].limit(
            vmin.radd(this.circle.radius), 
            vmax.rsub(this.circle.radius)
        );
    }
    //sigmoid follow for debugging
    // follow(vector) {
    //     const sigmoid = x => 1/(1-Math.exp(x));
    //     let norm = 100* sigmoid(vector.sub(this.position).norm);
    //     let angle = vector.sub(this.position).angle;
    //     this.motion.velocity = Vector.polar(norm, angle);
    // }

}