class SuperGroup {
    static random(n=0) {
        return new this(PlayerGroup.random(n));
    }
    constructor(
        playerGroup=new PlayerGroup(),
        foodGroup=FoodGroup.random(),
        virusGroup=VirusGroup.random(),        
    ) {
        this.playerGroup = playerGroup;
        this.foodGroup = foodGroup;
        this.virusGroup = virusGroup;
    }
    update(dt) {
        this.playerGroup.update(dt);
    }
    show(context) {
        this.foodGroup.show(context)
        this.playerGroup.show(context);
        this.virusGroup.show(context);
    }
    collide() {
        eatingPlayerVirus(this.playerGroup.map, this.virusGroup.map)
        eatingPlayerFood(this.playerGroup.map, this.foodGroup.map);
        eatingPlayerPlayer(this.playerGroup.map);
        rigidPlayerPlayer(this.playerGroup.map);
        // combiningPlayerPlayer(this.playerGroup.map);
    }
}

