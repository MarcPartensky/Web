class Ball {
    static startMass = 500;
    static mass = 100;
    static rate = 1e-10;
    static alive = true;
    static textColor = "#ffffff";
    static splitTime = null;
    static splitDuration = 20 * 1000;
    static vmin = new Vector(-500, -500);
    static vmax = new Vector(500, 500);
    static quotient = 1.1;

    static random(vmin=Ball.vmin, vmax=Ball.vmax) {
        const motion = Motion.random(2,2).rsub(1/2);
        motion[0].irmul(vmax.sub(vmin).norm/2);
        motion[1].irmul(0.1);
        return new this(motion);
    }
    constructor(motion, mass=Ball.startMass, splitTime=Ball.splitTime) {
        this.motion = motion;
        this.radius = Math.sqrt(mass/Math.PI);
        this.splitTime = splitTime;
    }
    get mass() {
        return Math.PI * this.radius**2;
    }
    set mass(value) {
        this.radius = Math.sqrt(value/Math.PI);
    }
    get x() {
        return this.motion.x;
      }
    set x(v) {
        this.motion.x = v;
    }
    get y() {
        return this.motion.y;
    }
    set y(v) {
        this.motion.y = v;
    }
    get vx() {
        return this.motion.vx;
    }
    set vx(v) {
        this.motion.vx = v;
    }
    get vy() {
        return this.motion.vy;
    }
    set vy(v) {
        this.motion.vy = v;
    }
    get position() {
        return this.motion.position;
    }
    set position(v) {
        this.motion.position = v;
    }
    get velocity() {
        return this.motion.velocity;
    }
    set velocity(v) {
        this.motion.velocity = v;
    }
    get strength() {
        return this.radius;
    }
    update(dt) {
        this.velocity.irmul(Ball.startMass/this.mass);
        this.updateMotion(dt);
        this.updateMass(dt);
        this.updateSplitTime();
    }
    updateMotion(dt) {
        this.motion.update(dt);
    }
    updateMass(dt) {
        this.radius *= (1-Ball.rate*dt);
    }
    updateSplitTime() {
        if (this.splitTime!=null) {
            if (Date.now()-this.splitTime > Ball.splitDuration) {
                console.log("split time is over");
                this.splitTime = Ball.splitTime;
            }
        }
    }
    canEat(ball) {
        if (this.position.sub(ball.position).norm > this.radius) {return false};
        if (this.radius/ball.radius < Ball.quotient) {return false};
        return true;
    }
    eat(ball) {
        this.mass = this.mass + ball.mass;
        ball.mass = 0;
    }
    explode(n) {
        const balls=[];
        let velocity = this.velocity.copy();
        velocity.angle -= Math.PI/2;
        let mass = this.mass/n;
        let motion;
        for (let i=0; i<n; i++) {
            velocity.angle += Math.PI*i/n;
            motion = new Motion(this.position.copy(), velocity.copy());
            balls.push(new Ball(motion, mass, Date.now()));
        }
        this.mass = 0;
        return balls;
    }
    show(context, name, color, textColor=Ball.textColor) {
        this.showCircle(context, color);
        this.showText(context, name, textColor);
      }
    showCircle(context, color) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(...this.motion[0], this.radius, 0, 2*Math.PI);
        context.fill();
        context.strokeStyle = Color.darken(color);
        context.arc(...this.motion[0], this.radius, 0, 2*Math.PI);
        context.stroke();
        context.closePath();
    }
    showText(context, name, color, k=0.3, mg=3) {
        const size = this.radius/2;
        context.textSize = size;
        context.fillStyle = color;
        context.fillText(name, this.x-k*size*name.length, this.y);
        const mass = String(Math.floor(this.mass));
        context.fillText(mass, this.x-k*size*mass.length, this.y+k*size*mg);
    }
    contains(position) {
        return this.position.sub(position).norm < this.radius;
    }
    collide(ball) {
        return this.position.sub(ball.position).norm < this.radius + ball.radius;
    }
    split(vector) {
        let v = vector.sub(this.position).rdiv(20);
        this.mass /= 2;
        let motion = new Motion(this.position, this.velocity.add(v));
        this.splitTime = Date.now();
        return new Ball(motion, this.mass, Date.now());
    }
    limit(vmin, vmax) {
        this.motion[0].limit(
            vmin.radd(this.radius), 
            vmax.rsub(this.radius)
        );
    }
    toString() {
        const o = {
            position: this.position,
            velocity: this.velocity,
            radius: this.radius};
        return o;
    }
    follow(vector) {
        let norm = vector.sub(this.position).norm;
        // norm = sigmoid(norm);
        norm = Math.min(Math.max(0, norm),1)*this.radius;
        let angle = vector.sub(this.position).angle;
        this.motion.velocity = Vector.polar(norm, angle).add(this.motion.velocity.rmul(8/10));
      }
}


class BallGroup extends BaseCircleGroup {
    static maxNumber = 16;
    static random(n) {
        const map = new Map();
        for (let i=0; i<n; i++) {
            map.set("Ball:"+String(i), Ball.random());
        }
        return new this(map);
    }
    clear() {
        for (const [key, ball] of this.map) {
            if (ball.mass <= 0) {
              this.map.delete(key);
            }
        }
    }
    sort(f = (b)=>b.mass) {
        this.map = new Map([...this.map.entries()].sort(f));
    }
    show(context, name, color) {
        for (const ball of this.map.values()) {
            ball.show(context, name, color);
        }
    }
    get mass() {
        return Array.from(this.map.values()).map(p => p.mass).reduce((x,y)=>x+y);
      }
}