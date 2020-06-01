class SuperGroup {
    static random(n=0) {
        return new this(PlayerGroup.random(n));
    }
    constructor(
        playerGroup=new PlayerGroup(),
        foodGroup=FoodGroup.random(),
        virusGroup=VirusGroup.random(),
        cache=new Map(),
    ) {
        this.playerGroup = playerGroup;
        this.foodGroup = foodGroup;
        this.virusGroup = virusGroup;
        this.cache = cache;
    }
    update(dt) {
        this.playerGroup.update(dt);
    }
    show(context) {
        this.foodGroup.show(context)
        this.playerGroup.show(context);
        this.virusGroup.show(context);
    }
    collide() { // server-side
        
        // eatingPlayerFood(this.playerGroup.map, this.foodGroup.map, cache);
        eatingPlayerPlayer(this.playerGroup.map, this.cache);
        rigidPlayerPlayer(this.playerGroup.map, this.cache);
        // combiningPlayer(this.playerGroup.map, this.cache);
    }

    collideClient(id) { // client-side
        eatingPlayerVirus(new Map([[id, this.playerGroup.map.get(id)]]), this.virusGroup.map, this.cache)
        eatingPlayerFood(new Map([[id, this.playerGroup.map.get(id)]]), this.foodGroup.map, this.cache);
    }

    handleCache(cache) {
        let food, player, ball1, ball2;
        for (const [key, values] of cache) {
            // console.log(key, values);
            if (key == "eatingPlayerFood") {
                const [ballKey, foodKey, playerKey] = values;
                food = this.foodGroup.map.get(foodKey);
                if (!food) return;
                player = this.playerGroup.map.get(playerKey);
                if (!player) return;
                ball1 = player.ballGroup.map.get(ballKey);
                if (!ball1) return;
                ball1.mass += food.mass;
                this.virusGroup.map.delete(foodKey);
            } else if (key == "eatingPlayerVirus") {
                const [playerKey, virusKey, player] = values;
                this.playerGroup.map.set(playerKey, player);
                this.virusGroup.map.delete(virusKey);
            } else if (key == "combiningPlayerPlayer") {
                const values = [ballKey1, ballKey2, playerKey];
                player = this.playerGroup.map.get(playerKey);
                if (!player) return;
                ball1 = player.ballGroup.map.get(ballKey1);
                if (!ball1) return;
                ball2 = player.ballGroup.map.get(ballKey2);
                if (!ball2) return;
                ball1.mass += ball2.mass;
                if (!ballKey2 in player.ballGroup.map) return;
                player.ballGroup.map.delete(ballKey2);
            }
        }
    }
}
    // handleCache(cache) { // client-side
    //     for (const key of cache) {
    //         if (key.startsWith("Virus")) {
    //             this.virusGroup.map.delete(key);
    //         } else if (key.startsWith("Food")) {
    //             this.foodGroup.map.delete(key);
    //         } else if (key.startsWith("Player")) {
    //             this.playerGroup.map.delete(key);
    //         }
    //     }
    // }
// }

