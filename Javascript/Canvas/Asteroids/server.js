const express = require('express'),
    http = require('http'),
    socket = require('socket.io'), // for easier connexion
    fs = require('fs'), // file system
    vm = require('vm'); // to execute scripts

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

const files = [
    // Tools and tests
    "libs/tools.js",
    "libs/test.js",
    // Base types  
    "libs/iterator.js",
    "libs/dict.js",
    "libs/tree.js",
    // Math types    
    "libs/group.js",
    "libs/tensor.js",
    "libs/vector.js",
    "libs/matrix.js",
    // Visual types
    "libs/color.js",
    "libs/point.js",
    "libs/figure.js",
    "libs/form.js",
    "libs/basepolygon.js",
    "libs/polygon.js",
    "libs/rectangle.js",
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
    "models/asteroid.js",
    "models/asteroidgroup.js",
    "models/spaceship.js",
    "models/spaceshipgroup.js",
    "models/meteor.js",
    "models/meteorgroup.js",
    "models/gamemap.js",
    "models/supergroup.js",
    "models/game.js",
    // Entry point
    "models/gameserver.js",
  ];

server.listen(process.env.PORT || 8000)

app.use('/libs', express.static('libs'));
app.use('/models', express.static('models'));


for (const file of files) {
    console.log(file);
    let data = fs.readFileSync(file);
    let script = new vm.Script(data);
    script.runInThisContext();
  }
  
// import * from "libs";

// import * from "./libs/tensor.js"


// var path = __dirname.split("/");
// path = path.slice(0,-1).join("/");

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});