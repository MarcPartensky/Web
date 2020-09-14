const canvas = document.getElementById('canvas');

let _w = window.innerWidth;
let _h = window.innerHeight;


const renderer = new PIXI.Renderer({
    view: canvas,
    width: _w,
    height: _h,
    resolution: window.devicePixelRatio,
    autoDensity: true
});

window.addEventListener('resize', resize);

function resize() {
    _w = window.innerWidth;
    _h = window.innerHeight;

    renderer.resize(_w, _h);
}

const stage = new PIXI.Container();

const texture = PIXI.Texture.from('sprites/sprite.png');
const img = new PIXI.Sprite(texture);

img.anchor.x = img.anchor.y = 0.5;
img.scale.x = 0.1;
img.scale.y = 0.1;

stage.addChild(img);

const ticker = new PIXI.Ticker();
ticker.add(animate);
ticker.start();

function animate() {
    img.x = renderer.screen.width/2;
    img.y = renderer.screen.height/2;

    img.rotation += 0.1;
    renderer.render(stage);
}

app.ticker.add(animate);