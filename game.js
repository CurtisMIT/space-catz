let app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x2ad999});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x061639;

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;

var stage = new PIXI.Container();
document.body.appendChild(app.view);

loader
  .add("images/cat.png")
  .load(setup);

let cat;

function setup() {

  //Create the `cat` sprite 
  cat = new Sprite(resources["images/cat.png"].texture);
  cat.y = 96; 
  cat.vx = 0;
  cat.vy = 0;
  app.stage.addChild(cat);
 
  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
  cat.interactive = true;
  cat.on('click', function(e){
  console.log("touched");
})
}

function gameLoop(delta){

  //Update the cat's velocity
  cat.vx = 1;
  cat.vy = 1;

  //Apply the velocity values to the cat's 
  //position to make it move
  cat.x += cat.vx;
  cat.y += cat.vy;
}





