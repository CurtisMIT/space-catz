let app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x2ad999});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x061639;

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;
    Text = PIXI.Text;
    TextStyle = PIXI.TextStyle;

var stage = new PIXI.Container();
document.body.appendChild(app.view);


loader
  .add("images/cat.png")
  .load(setup);

let cat;
let score = 0;

let style = new TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: "white",
  stroke: '#ff3300',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
});

let message = new Text("SCORE: ", style);

//Position it and add it to the stage
message.position.set(1200, 70);
app.stage.addChild(message);



function setup() {

  //Create the cat sprite 
  cat = new PIXI.Sprite.fromImage('https://i.gifer.com/4dI1.gif');
  cat.y = 96; 
  cat.vx = 0;
  cat.vy = 0;
  app.stage.addChild(cat);
  
 
  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
  cat.interactive = true;
  cat.on('click', function(e){
    console.log("touched");
    score = score + 1;
    message.text = "SCORE: " + score;
    app.stage.removeChild(cat);
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
  creation(cat);
}

function creation(cat){
  cat = new Sprite(resources["images/cat.png"].texture);
  cat.y = 96; 
  cat.vx = 0;
  cat.vy = 0;
  app.stage.addChild(cat);
}


const colors = [0x3CA55C, 0xDA22FF]
let currentColor = 0;

let colorSwitcher = new PIXI.Graphics();
const colorSwitcherWidth = 300;
const colorSwitcherHeight = 120;

colorSwitcher.beginFill(colors[0], 1);
colorSwitcher.drawRect(
  window.innerWidth/2 - colorSwitcherWidth/2,
  window.innerHeight - colorSwitcherHeight/2,
  colorSwitcherWidth,
  colorSwitcherHeight
);
colorSwitcher.interactive = true;
colorSwitcher.on("click", handleColorSwitch);

function handleColorSwitch() {
  if(currentColor === 0) {
    console.log(currentColor);
    console.log(colors[currentColor]);
    colorSwitcher.filters[createTintFilter(colors[currentColor])];
    currentColor = 1;
  } else {
    console.log(currentColor);
    colorSwitcher.filters[createTintFilter(colors[currentColor])];
    currentColor = 0;
  };
  colorSwitcher.filters[createTintFilter(colors[currentColor])];
}

