class Missile extends GameEntity {
    static size = 1;
    static random() {

    }
    static make(body) {
        return new this(
            new Segment([0, 0], [0, Missile.size]),
            body.slice(0, 2)
        );
        
    }
    //just here to emphasize the fact that the form
    // must be a segment
    // constructor(segment, body) {
    //     super(segment, body);
    // }
}