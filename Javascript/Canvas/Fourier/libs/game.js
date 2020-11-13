export default class Game {
    static ticks = 60
    constructor(ticks=Game.ticks) {
        this.ticks = ticks
        this.interval = undefined
    }
    update() {

    }
    start() {
        this.interval = setInterval(this.update.bind(this), this.ticks)
    }
}
