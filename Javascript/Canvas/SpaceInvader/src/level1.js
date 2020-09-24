class Level1 extends Level {
    constructor(
        player = new Player(),
        enemyGroup = new EnemyGroup(),
        missileGroup = new MissileGroup()
    ) {
        super()
        this.player = player
        this.enemyGroup = enemyGroup
        this.missileGroup = missileGroup
    }
    start() {

    }
    show(context) {
        this.player.show(context)
        this.enemyGroup.show(context)
        this.missileGroup.show(context)
    }
}
