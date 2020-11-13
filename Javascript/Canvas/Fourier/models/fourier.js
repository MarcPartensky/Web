import GameClient from '../libs/gameclient.js'
import Circle from '../libs/circle.js'
import Vector from '../libs/vector.js'

export default class Fourier extends GameClient {
    create() {
        this.circle = new Circle(new Vector(0, 0), 5, 1, 'red', true);
        var ctx = this.context.context
        ctx.beginPath();
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.stroke();
        this.circle.show(this.context)
    }
    update(dt) {
        this.show()
    }
    show() {
        this.circle.show(this.context)
        console.log('circle')
    }
    onResize(...args) {
        super.onResize(...args)
        console.log(this.canvas.width)
    }
}
