class BallGroup extends Group {
    static rate = 0.001;
    static colliding = true;
    static eating = false;
    static refreshing = false;

    static init(
        balls,
        colliding=this.colliding, 
        eating=this.eating,
        refreshing=this.refreshing,
        rate=this.rate,
    ) {
        let g = super.from(balls);
        g.colliding = colliding;
        g.eating = eating;
        g.refreshing = refreshing;
        g.rate = rate;
        return g;
    }
    update(dt) {
        this.forEach(g => g.update(dt, this.rate));
        if (this.eating) {
            this.handleEating();
        }
        if (this.colliding) {
            this.handleCollision();
        }

        if (this.refreshing) {
            this.refresh();
        }
    }
    handleEating() {
        for (const [g1, g2] of combinations(this, 2)) {
            this.handleBothEating(g1, g2);
        }
    }
    handleCollision() {
        for (const [g1, g2] of combinations(this, 2)) {
            this.handleBothCollision(g1, g2);
        } 
    }
    refresh() {
        this.refreshing = false;
    }
    show(context) {
        this.forEach(b => b.show(context));
    }
    follow(position) {
        this.forEach(b => b.follow(position));
    }
    limit(vmin, vmax) {
        this.forEach(b => b.limit(vmin, vmax));
    }
    get position() {
        return Vector.sum(...this.map(e => e.position.rmul(e.mass))).rdiv(this.mass);
    }
    get mass() {
        let v = 0;
        for (const e of this) {
            v+=e.mass;
        }
        return v;
    }
}