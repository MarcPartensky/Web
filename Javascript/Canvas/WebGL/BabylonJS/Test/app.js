
var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.9,0.9,0.9);
var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
var player = BABYLON.Mesh.CreateBox("player", 3, scene);
var pointerLock = false;

var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
// scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
// scene.collisionsEnabled = true;
var speed = 20;

var boxes = [];
var n = 50;

for (let i=0; i<10; i++) {
  var box = BABYLON.Mesh.CreateBox("box"+i, 3, scene);
  var material = new BABYLON.StandardMaterial("dirt", scene);
  box.material = material;
  box.diffuseTexture = new BABYLON.Texture("dirt.png", scene);
  box.diffuseTexture.uScale = 8.0;
  box.diffuseTexture.vScale = 8.0;
  box.scaling.x=1;
  box.scaling.y=1;
  box.scaling.z=1;
  box.position.x = parseInt(n*Math.random());
  box.position.y = parseInt(n*Math.random());
  box.position.z = parseInt(n*Math.random());
  boxes.push(box);
}


player.movement = {forward: false, backward:false, left:false, right:false};

var mouse = {x:undefined, y:undefined, down:false}
var mouseSensibility = 0.5;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

var angleRatio = 180/Math.PI;
function toRadian(angle) {return angle/angleRatio;}
function toDegree(angle) {return angle*angleRatio;}

function onMouseMotion(evt) {
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
  camera.rotation.x += toRadian(evt.movementY) * mouseSensibility;
  camera.rotation.y += toRadian(evt.movementX) * mouseSensibility;
}

function onMouseDown() {
  mouse.down = true;
}

function onMouseUp() {
  mouse.down = false;
}

function move(fps) {
  relativeSpeed = speed / fps;
  if (player.movement.forward) {
    forward = new BABYLON.Vector3(
      parseFloat(Math.sin(parseFloat(player.rotation.y))) * relativeSpeed,
      0,
      parseFloat(Math.cos(parseFloat(player.rotation.y))) * relativeSpeed,
    );
    player.moveWithCollisions(forward);
  }
  if(player.movement.backward){
    backward = new BABYLON.Vector3(
      parseFloat(-Math.sin(parseFloat(player.rotation.y))) * relativeSpeed,
      0,
      parseFloat(-Math.cos(parseFloat(player.rotation.y))) * relativeSpeed
    );
    player.moveWithCollisions(backward);
  }
  if(player.movement.left){
    left = new BABYLON.Vector3(
      parseFloat(Math.sin(parseFloat(player.rotation.y) + toRadian(-90))) * relativeSpeed,
      0,
      parseFloat(Math.cos(parseFloat(player.rotation.y) + toRadian(-90))) * relativeSpeed
    );
    player.moveWithCollisions(left);
  }
  if(player.movement.right){
    right = new BABYLON.Vector3(
      parseFloat(-Math.sin(parseFloat(player.rotation.y) + toRadian(-90))) * relativeSpeed,
      0,
      parseFloat(-Math.cos(parseFloat(player.rotation.y) + toRadian(-90))) * relativeSpeed
    );
    player.moveWithCollisions(right);
  }
}

function onKeyDown(evt) {
    switch(evt.keyCode){
        case 87: // KeyW
          player.movement.forward = true;
          break;
        case 90: // KeyW
          player.movement.forward = true;
          break;
        case 83: // KeyS
          player.movement.backward = true;
          break;
        case 65: // KeyA
          player.movement.left = true;
          break;
        case 81: // KeyA
          player.movement.left = true;
          break;
        case 68: // KeyD
          player.movement.right = true;
          break;
        case 8:
          player.movement.up = true;
          break;
        case 38:
          player.movement.up = true;
          break;
        case 40:
          player.movement.down = true;
          break;
        case 27:
          console.log("escape");
          pointerLock = false;
          onPointerLockChange();
          break;
    }
  }

  function onKeyUp(evt) {
      switch(evt.keyCode){
          case 87: // KeyW
            player.movement.forward = false;
            break;
          case 90: // KeyW
            player.movement.forward = false;
            break;
          case 83: // KeyS
            player.movement.backward = false;
          break;
          case 65: // KeyA
            player.movement.left = false;
            break;
          case 81: // KeyA
            player.movement.left = false;
            break;
          case 68: // KeyD
            player.movement.right = false;
            break;
          case 8:
            player.movement.up = false;
            break;
          case 38:
            player.movement.up = false;
            break;
          case 40:
            player.movement.down = false;
            break;
      }
    }

function onPointerLockChange() {
  if (pointerLock) {
    canvas.addEventListener('mousemove', onMouseMotion);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener("keydown", onKeyDown);
    canvas.addEventListener("keyup", onKeyUp);
    canvas.requestPointerLock();
  } else {
    canvas.removeEventListener('mousemove', onMouseMotion);
    canvas.removeEventListener('mousedown', onMouseDown);
    canvas.removeEventListener('mouseup', onMouseUp);
    canvas.removeEventListener("keydown", onKeyDown);
    canvas.removeEventListener("keyup", onKeyUp);
  }
  console.log(pointerLock);
}

function onClick(e) {
  if (!pointerLock) {
    pointerLock = true;
    onPointerLockChange();
  }
}


function main(e) {
  resize();
  canvas.addEventListener("click", onClick);

  canvas.addEventListener("onPointerLockChange", onPointerLockChange);
  canvas.addEventListener("msonPointerLockChange", onPointerLockChange);
  canvas.addEventListener("mozonPointerLockChange", onPointerLockChange);
  canvas.addEventListener("webkitonPointerLockChange", onPointerLockChange);

  scene.registerBeforeRender(() => {
    camera.position = player.position;
    camera.rotation = player.rotation;
  });

  engine.runRenderLoop(function() {
    var fps = Math.round(1000/engine.getDeltaTime());
    if (pointerLock) {
      move(fps);
    }
    scene.render();
  });
}

document.addEventListener("DOMContentLoaded", main);
