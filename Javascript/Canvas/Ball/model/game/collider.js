// class GeneralCollider  {
//     handleSelf(map,f, args) {
//         for (const [e1, e2] in combinations(map)) {
//             f(e1,e2,...args)
//         }
//     }
//     handleBoth(map1, map2, f, args) {
//         for (const e1 of map1) {
//             for (const e2 of map2) {
//                 f(e1, e2, ...args);
//             }
//         }
//     }
//     handleOne(map, e, f, args) {
//         for (const e1 of map) {
//             f(e1, e, ...args);
//         }
//     }
//     handle
// }

// class SimpleCollider {
//     match(e1, e2) {

//     }

// }

// class SuperCollider {
//     constructor(collider) {
//         this.collider = collider;
//     }

// }




// class Collider {
//     constructor(check=0) {
//         this.check = check;
//     }
//     call(balls) {
//         const n = balls.length;
//         const bls = Array(n);
//         for (let i=0; i<n; i++) {
//             bls[i] = Array();
//             for (let j=i+1; j<n; j++) {
//                 [b1, b2] = this.callBoth(balls[i], balls[j]);
//                 bls[i].push(b1.position, b2.position);
//             }
//         }
//         for (let i=0; i<n; i++) {
//             balls[i].motion.position.iadd(Vector.sum(...bls[i]));
//         }

//     }
//     handle(balls, f=this.handleBoth, ...args) {
//         for (const [g1, g2] of combinations(balls, 2)) {
//             f(g1, g2, ...args);
//         }
//     }
//     crossHandle(g1, g2, f=this.handleBoth, ...args) {
//         console.log(g1, g2);
//         for (const b1 of g1) {
//             for (const b2 of g2) {
//                 f(b1, b2, ...args);
//             }
//         }
//     }
//     sort(balls) {
//         return balls.sort(b=>b.radius);
//     }
// }


// class RigidCollider extends Collider {
//     handleBoth(b1, b2) {
//         let v = b1.motion[0].sub(b2.motion[0]);
//         const n = v.norm;
//         const r1 = b1.radius;
//         const r2 = b2.radius;
//         if (v.norm == 0) {v = new Vector.random();}
//         if (v.norm < r1+r2) {
//             const d = r1+r2-v.norm;
//             // v.norm = d/2;
//             v.norm = d*r2/(r1+r2);
//             b1.motion[0].iadd(v);
//             v.norm = d*r1/(r1+r2);
//             b2.motion[0].isub(v);
//         }
//     }
//     callBoth(b1, b2) {
//         let v = b1.motion[0].sub(b2.motion[0]);
//         const n = v.norm;
//         const r1 = b1.radius;
//         const r2 = b2.radius;
//         if (v.norm == 0) {v = new Vector.random();}
//         if (v.norm < r1+r2) {
//             const d = r1+r2-v.norm;
//             // v.norm = d/2;
//             v.norm = d*r2/(r1+r2);
//             b1.motion[0].iadd(v);
//             v.norm = d*r1/(r1+r2);
//             b2.motion[0].isub(v);
//         }
//         return [b1, b2];

//     }
// }

// class RigidBallCollider {
    


// }


// class EatPlayerCollider extends Collider {
//     handleBoth(b1, b2) {
//         console.log("eating check");
//         if (b1.canEat(b2)) {
//             console.log("eating confirmed");
//             b1.eat(b2);
//         }
//     }
//     handleEating(players) {
//         players = [...players.values()];
//         this.naiveHandleEating(players);
// // this.handle(players, this.crossHandle.bind(this), this.handleBoth.bind(this));
//     }
//     naiveHandleEating(players) {
//         // eatings tests can be executed in one order only because
//         // the balls have already been sorted
//         let eating;
//         for (const [p1, p2] of combinations(players, 2)) {
//             for (const b1 of p1.balls) {
//                 for (const b2 of p2.balls) {
//                     if (b1.canEat(b2)) {
//                         b1.eat(b2);
//                     }
//                 }
//             }
//         }
//     }
// }


// class CombiningCollider extends Collider {
//     combineBoth(b1, b2) {
//         if (!b1.splitTime && !b2.splitTime) {
//             b1.mass += b2.mass;
//             b2.mass = 0;
//         }
//     }
// }

// class EatingColliderPlayerVirus extends Collider {
//     handle(playerMap, virusMap) {
//         this.handleBoth(playerMap, virusMap, this.match)
//         // for (const player of playerMap) {
//         //     for (const virus of virusMap) {
//         //         this.match(player, virus);
//         //     }
//         // }
//     }
//     match(player, virus) {
//         const newBalls = [];
//         let n, mass;
//         for (const ball of player.balls) {
//             if (ball.canEat(virus)) {
//                 mass = Math.max(Ball.mass, ball.mass/player.balls.length)
//                 n = Math.max()
//                 newBalls.push(...ball.explode(n));
//             } else {
//                 newBalls.push(ball);
//             }
//         }
//         player.balls = newBalls;
//     }
// }


// class EatingColliderPlayerFood extends Collider {
//     handle(playerMap, foodMap) {
//         this.handleBoth(playerMap, foodMap, this.match)
//     }
//     match(player, food) {
//         for (const ball of food.balls) {
//             if (ball.canEat(food)) {



//             }
//         }
//     }
// }

function rigidPlayerPlayer(playerMap, cache) { // Can be enhanced
    let ballArray;
    for (const player of playerMap.values()) {
        ballArray =  Array.from(player.ballGroup.map.entries());
        for (const [[ballKey1, ball1], [ballKey2, ball2]] of combinations(ballArray,2)) {
            let v = ball1.motion[0].sub(ball2.motion[0]);
            const n = v.norm;
            const r1 = ball1.radius;
            const r2 = ball2.radius;
            if (v.norm == 0) {v = Vector.random();}
            if (v.norm < r1+r2) {
                const d = r1+r2-v.norm;
                // v.norm = d/2;
                v.norm = d*r2/(r1+r2);
                ball1.motion[0].iadd(v);
                v.norm = d*r1/(r1+r2);
                ball2.motion[0].isub(v);
            }
        }
    }
}

function eatingPlayerPlayer(playerMap, cache) { // Can be enhanced
    const playerArray =  Array.from(playerMap.entries());
    for (const [[playerKey1, player1],[playerKey2, player2]] of combinations(playerArray,2)) {
        for (const [ballKey1, ball1] of player1.ballGroup.map) {
            for (const [ballKey2, ball2] of player2.ballGroup.map) {
                if (ball1.canEat(ball2)) {
                    ball1.mass += ball2.mass;
                    player2.ballGroup.map.delete(ballKey1);
                }
                if (ball2.canEat(ball1)) {
                    ball2.mass += ball1.mass;
                    player1.ballGroup.map.delete(ballKey2);
                }
            }
        }
    }
}

function combiningBallBall(playerMap, cache) {
    for (const [playerKey, player] of playerMap) {
        for (const [[ballKey1, ball1], [ballKey2, ball2]] of combinations(player.ballGroup.map, 2)) {
            if (ball1.canCombineWith(ball2)) {
                ball1.mass += ball2.mass;
                player.ballGroup.map.delete(keyBall2);
            }
        }
    }
}


function eatingPlayerVirus(playerMap, virusMap, cache) {
    for (const [playerKey, player] of playerMap) {
        for (const [virusKey, virus] of virusMap) {
            // console.log(player, virus);
            const newBalls = [];
            let n;
            for (const [ballKey, ball] of player.ballGroup.map) {
                if (ball.canEat(virus)) {
                    n = Math.floor(ball.mass/Ball.mass)
                    if (n>BallGroup.maxNumber-player.ballGroup.map.size) {
                        n = BallGroup.maxNumber-player.ballGroup.map.size;
                    }
                    i = 0;
                    for (const b of ball.explode(n)) {
                        while (player.ballGroup.map.has("Ball:"+String(i))) {
                            i+=1;
                            console.log(i);
                        }
                        newBalls.push(["Ball:"+String(i), b])
                        i+=1;
                    }
                    virusMap.delete(virusKey);
                    player.ballGroup.map.delete(ballKey);
                }
            }
            // console.log(Array.from(player.ballGroup.map.entries()));
            if (n>0) {
                player.ballGroup.map = new Map(Array.from(player.ballGroup.map.entries()).concat(newBalls));
            }
        }
    }
    
}

function eatingPlayerFood(playerMap, foodMap, cache) {
    for (const [playerKey,player] of playerMap) {
        for (const [ballKey, ball] of player.ballGroup.map) {
            for (const [foodKey, food] of foodMap) {
                if (ball.canEat(food)) {
                    ball.mass += food.mass;
                    foodMap.delete(foodKey);
                }
            }
        }
    }

}

// class VirusPlayer
/*
player/player: resist, eat, combine
player/food: eat
player/virus: eat
*/
