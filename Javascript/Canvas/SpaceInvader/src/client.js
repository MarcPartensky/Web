const ticks = 10
const canvas = document.getElementById('canvas')
const levels = [
    new Level1()
]
const game = new Game(ticks, canvas, levels)
game.context.plane.units.position = new Vector(50, 50)
game.levelIndex = 0
game.main()
