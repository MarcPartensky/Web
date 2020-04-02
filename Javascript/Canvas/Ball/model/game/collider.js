class Collider {
    constructor(check=0) {
        this.check = check;
    }
    call(balls) {
        const n = balls.length;
        const bls = Array(n);
        for (let i=0; i<n; i++) {
            bls[i] = Array();
            for (let j=i+1; j<n; j++) {
                [b1, b2] = this.callBoth(balls[i], balls[j]);
                bls[i].push(b1.position, b2.position);
            }
        }
        for (let i=0; i<n; i++) {
            balls[i].motion.position.iadd(Vector.sum(...bls[i]));
        }

    }
    handle(balls, f=this.handleBoth, ...args) {
        for (const [g1, g2] of combinations(balls, 2)) {
            f(g1, g2, ...args);
        }
    }
    crossHandle(g1, g2, f=this.handleBoth, ...args) {
        console.log(g1, g2);
        for (const b1 of g1) {
            for (const b2 of g2) {
                f(b1, b2, ...args);
            }
        }
    }
    sort(balls) {
        return balls.sort(b=>b.radius);
    }
}


class RigidCollider extends Collider {
    handleBoth(b1, b2) {
        let v = b1.motion[0].sub(b2.motion[0]);
        const n = v.norm;
        const r1 = b1.radius;
        const r2 = b2.radius;
        if (v.norm == 0) {v = new Vector.random();}
        if (v.norm < r1+r2) {
            const d = r1+r2-v.norm;
            // v.norm = d/2;
            v.norm = d*r2/(r1+r2);
            b1.motion[0].iadd(v);
            v.norm = d*r1/(r1+r2);
            b2.motion[0].isub(v);
        }
    }
    callBoth(b1, b2) {
        let v = b1.motion[0].sub(b2.motion[0]);
        const n = v.norm;
        const r1 = b1.radius;
        const r2 = b2.radius;
        if (v.norm == 0) {v = new Vector.random();}
        if (v.norm < r1+r2) {
            const d = r1+r2-v.norm;
            // v.norm = d/2;
            v.norm = d*r2/(r1+r2);
            b1.motion[0].iadd(v);
            v.norm = d*r1/(r1+r2);
            b2.motion[0].isub(v);
        }
        return [b1, b2];

    }
}


class EatingCollider extends Collider {
    handleBoth(b1, b2) {
        console.log("eating check");
        if (b1.canEat(b2)) {
            console.log("eating confirmed");
            b1.eat(b2);
        }
    }
    handleEating(players) {
        players = [...players.values()];
        this.naiveHandleEating(players);
// this.handle(players, this.crossHandle.bind(this), this.handleBoth.bind(this));
    }
    naiveHandleEating(players) {
        // eatings tests can be executed in one order only because
        // the balls have already been sorted
        let eating;
        for (const [p1, p2] of combinations(players, 2)) {
            for (const b1 of p1.balls) {
                for (const b2 of p2.balls) {
                    if (b1.canEat(b2)) {
                        b1.eat(b2);
                    }
                }
            }
        }
    }
}


class CombiningCollider extends Collider {
    combineBoth(b1, b2) {
        if (!b1.splitTime && !b2.splitTime) {
            b1.mass += b2.mass;
            b2.mass = 0;
        }
    }
}

class PlayerViruses extends Collider {
    handle(players, viruses) {
        for (const player of players) {
            for (const virus of viruses) {
                this.handlePlayerVirus(player, virus);
            }
        }
    }
    handlePlayerVirus(player, virus) {
        const newBalls = [];
        let n, mass;
        for (const ball of player.balls) {
            if (ball.canEat(virus)) {
                mass = Math.max(Ball.mass, ball.mass/player.balls.length)
                n = Math.max()
                newBalls.push(...ball.explode(n));
            } else {
                newBalls.push(ball);
            }
        }
        player.balls = newBalls;
    }
}

// class VirusPlayer
/*
player/player: resist, eat, combine
player/food: eat
player/virus: eat
*/
