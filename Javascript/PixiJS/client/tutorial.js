const canvas = document.getElementById('canvas');

const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight
})

// document.body.appendChild(app.view);

const texture = PIXI.Texture.from('sprites/sprite.png');
const img = new PIXI.Sprite(texture);

img.x = app.renderer.width/2;
img.y = app.renderer.height/2;
img.anchor.x = img.anchor.y = 0.5;
img.scale.x = 0.1;
img.scale.y = 0.1;


app.stage.addChild(img);

function animate() {
    img.rotation += 0.1;
}

app.ticker.add(animate);