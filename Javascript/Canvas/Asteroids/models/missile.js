class Missile extends GameEntity {
    static size = 1;
    static duration = 3; // seconds
    static random(source=undefined, target=undefined)
    {
        new Segment([0, 0], [0, Missile.size]),
        Body.random(1, 2);
        source,
        target
    }
    static make(source, target=undefined, duration=Missile.duration) {
        return new this(
            new Segment([0, 0], [0, Missile.size]),
            source.body.slice(0, 2),
            source,
            target,
            duration
        );
        
    }
    constructor(
        form,
        body,
        source=undefined,
        target=undefined,
        duration=Missile.duration,
    ) {
        super(form, body);
        this.source = source;
        this.target = target;
        this.duration = duration;
        this.time = undefined;
    }
    update(dt) {
        if (!this.time) {
            this.time = Date.now()
        }
        if (!this.alive) {
            this.removing = true;
        }
        super.update(dt);
    }
    get left() {
        return Date.now() - this.time;
    }
    get alive() {
        return this.left>=this.duration;
    }
}