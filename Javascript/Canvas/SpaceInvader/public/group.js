class Group {
    constructor(entities) {
        this.entities = entities
    }
    update(dt) {
        for (const entity of this.entities) {
            entity.update(dt)
        }
    }
    show(context) {
        for (const entity of this.entities) {
            entity.show(context)
        }
    }
}
