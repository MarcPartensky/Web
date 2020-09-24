class Game extends GameClient {
    constructor(ticks, context, levels=[]) {
        super(ticks, context)
        this.levels = levels
        this.levelIndex = undefined
    }
    get level() {
        return this.levels[this.levelIndex]
    }
    set level(value) {
        this.levels[this.levelIndex]
    }
    show() {
        super.show()
        this.level.show(this.context)
    }
    onKeyDown(evt) {
        super.onKeyDown(evt)
        switch(evt.key) {
            case 'a':
                break;
        }
    }
}
