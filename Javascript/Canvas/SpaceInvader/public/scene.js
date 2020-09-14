class Scene {
    constructor(group) {
        this.group = group
    }
    update(dt) {
        this.group.update()
    }
}
