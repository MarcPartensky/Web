class UpperBallGroup extends BallGroup {
    static colliding = false;
    static eating = true;
    static random(n=10) {
        let a = Array(n);
        for (let i=0; i<n; i++) {
            a[i] = LowerBallGroup.random();
        }
        return this.init(a);
    }
    handleBothEating(g1, g2) {
        for (const b1 of g1) {
            for (const b2 of g2) {
                g1.handleBothEating(b1,b2);
                this.refreshing = true;
            }
        }
    }
    handleBothCollision(g1, g2) {
        for (const b1 of g1) {
            for (const b2 of g2) {
                g1.handleBothCollision(b1, b2);
                this.refreshing = true;
            }
        }
    }
    refresh() {
        super.refresh();
        this.set(this.filter(g => g.length!=0));
    }
}

class LowerBallGroup extends BallGroup {
    static random(n=10, name=undefined, color=Color.random()) {
        let a = Array(n);
        for (let i=0; i<n; i++) {
            a[i] = Ball.random(name, color);
        }
        return this.init(a);
    }
    handleBothEating(b1, b2) {
        if (b1.canEat(b2)) {
            this.refreshing = true;
            b1.eat(b2);
        }
    }
    handleBothCollision(b1, b2) {
        let v = b1.motion.position.sub(b2.motion.position);
        // b1.motion.velocity = b1.motion.velocity.project(v);
        // b2.motion.velocity = b2.motion.velocity.project(v);
        const r1 = b1.circle.radius;
        const r2 = b2.circle.radius;
        const d = r1+r2-v.norm;
        if (v.norm == 0) {v = new Vector(0, 1);}
        if (d > 0) {
            // console.log(d*(r2/2/(r1+r2)));
            // console.log(d*(r1/2/(r1+r2)));
            v.norm = 1;
            // console.log(v.rmul(d*r2/2/(r1+r2)));
            // console.log(b1.position);
            // console.log(d*r2/(r1+r2));
            // console.log(v);
            // console.log(v.rmul(d*r2/(r1+r2)))
            // console.log(b1[0][0]);
            b1[0][0].iadd(v.rmul(d*r2/(r1+r2)));
            // console.log(b1[0][0]);
            b2[0][0].isub(v.rmul(d*r1/(r1+r2)));
            // console.log(b1.position);
            // console.log(b1.radius, b2.radius);
            // console.log(g1.position);

            b1[0][1].irmul(0.1);
            b2[0][1].irmul(0.1);
        }
    }
    /* Sorting in descending order of mass */
    refresh(f=(b1, b2) => (b2.circle.radius-b1.circle.radius)) {
        super.refresh();
        super.sort(f);
    }
    split(vector) {
        this.concat(this.map(b => b.split(vector)));
    }
}