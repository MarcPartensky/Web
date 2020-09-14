
import {EventEmitter} from 'events';
import * as express from 'express';
import http from 'http';
import path from 'path';
import GameServer from './server/models/gameserver';
import Game from './server/models/game';

export function main() {
    

    const files = [
        // Tools and tests
        // "libs/tools.js",
        // "libs/test.js",
        // Base types  
        "libs/iterator.js",
        "libs/dict.js",
        "libs/tree.js",
        // Math types    
        "libs/group.js",
        // "libs/tensor.js",
        // "libs/vector.js",
        "libs/matrix.js",
        // Visual types
        "libs/color.js",
        "libs/point.js",
        "libs/figure.js",
        // "libs/line.js",
        "libs/form.js",
        "libs/basepolygon.js",
        "libs/segment.js",
        "libs/polygon.js",
        "libs/rectangle.js",
        "libs/square.js",
        "libs/circle.js",
        // Physics types
        "libs/motion.js",
        "libs/body.js",
        "libs/plane.js",
        "libs/context.js",
        "libs/entity.js",
        "libs/manager.js",
        // Game types
        "models/gameentity.js",
        "models/missile.js",
        "models/missilegroup.js",
        "models/life.js",
        "models/follower.js",
        "models/shooter.js",
        "models/asteroid.js",
        "models/asteroidgroup.js",
        "models/spaceship.js",
        "models/spaceshipgroup.js",
        "models/meteor.js",
        "models/meteorgroup.js",
        "models/collider.js",
        "models/gamemap.js",
        "models/supergroup.js",
        "models/game.js",
        // Entry point
        "models/gameserver.js",
    ];

    // var path = __dirname.split("/");
    // path = path.slice(0,-1).join("/");


    const game = Game.random();
    //console.log(`Le group ${game.group.get('asteroidGroup')}`);
    const io:string="undefined";
    const gameServer = new GameServer(game, io);
    gameServer.setUp();
    gameServer.main();
}