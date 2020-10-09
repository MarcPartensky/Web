const canvas = document.getElementById('canvas')

const context = canvas.getContext('2d')

function show() {
    context.beginPath()
    context.arc(100, 75, 50, 0, 2*Math.PI)
    context.stroke()
}

function resize() {
    canvas.height = context.height = document.innerHeight
    canvas.width = context.width = document.innerWidth
}
canvas.addEventListener('resize', resize)

setInterval(show, 1000);

