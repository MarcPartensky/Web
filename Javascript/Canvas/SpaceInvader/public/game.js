class Game {
    constructor(levels, levelIndex=0) {
        this.levels = levels
        this.levelIndex
        this.interval = undefined
        this.ticks = 100
    }
    get level() {
        return this.levels[this.levelIndex]
    }
    update() {
        this.level.update()
    }
    start() {

    }
    main() {
        this.start()
        this.interval = setInterval(this.update.bind(this), this.ticks)
    }
}
