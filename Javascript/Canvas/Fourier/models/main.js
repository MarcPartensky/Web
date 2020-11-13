import Fourier from '../models/fourier.js'
import Vector from '../libs/vector.js'

const ticks = 1000


const canvas = document.getElementById("canvas-fourier")

const fourier = new Fourier(canvas)

fourier.ticks = ticks
fourier.context.plane.units.position = new Vector(canvas.width/2, canvas.height/2)
fourier.context.plane.location.position = new Vector(0.5, 0.5)

fourier.main()
console.log(fourier)

