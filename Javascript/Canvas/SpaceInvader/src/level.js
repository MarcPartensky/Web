class Level {
    constructor(group) {
        this.group = group
    }
    update() {
        this.group.update()
    }
    show(context) {
        this.group.show(context)
    }
}
