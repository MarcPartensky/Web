class Player extends Entity {
    constructor(
        form = new Square(),
        body = new Body(new Motion(new Vector()))
    ) {
        super(S, body)
    }

}


