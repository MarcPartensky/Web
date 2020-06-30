const canvas = document.getElementById('canvas');

const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight
});

console.log(PIXI.utils.TextureCache);

let loader = PIXI.Loader.shared;
loader.onComplete.add(handleLoadComplete);
loader.onLoad.add(handleLoadAsset);
loader.onError.add(handleLoadError);
loader.onProgress.add(handleLoadProgress);

loader.add('sprites/sprite.png');
loader.load();


let img;

function handleLoadProgress(loader, resource) {
    console.log(loader.progress + "% loader", resource.name);
}

function handleLoadAsset() {
    console.log('asset loaded');
}

function handleLoadError() {
    console.log('load error');
}

function handleLoadComplete() {
    let texture = loader.resources['sprites/sprite.png'].texture;
    img = new PIXI.Sprite(texture);
    img.anchor.x = 0.5;
    img.anchor.y = 0.5;
    app.stage.addChild(img);
    app.ticker.add(animate);
}


function animate() {
    img.x = app.renderer.screen.width/2;
    img.y = app.renderer.screen.height/2;
    img.rotation += 0.1;
}