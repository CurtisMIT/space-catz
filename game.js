app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x2ad999});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x061639;
let background = new PIXI.Sprite.fromImage("https://i.ibb.co/mywwWzP/background.png");
background.height = window.innerHeight;
app.stage.addChild(background);

var stage = new PIXI.Container();
document.body.appendChild(app.view);

const colors = [0x3CA55C, 0xDA22FF]
let currentColor = 0;

let style = new PIXI.TextStyle({
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


let message = new PIXI.Text("SCORE: ", style);
let cats = [];
let score = 0;
let colorSwitcher;

PIXI.loader
  .load(setup)
  .load(setupColorSwitcher);

function setup() {
  //Position it and add it to the stage
  message.position.set(1200, 70);
  app.stage.addChild(message);
  createCat();
  app.ticker.add(delta => gameLoop(delta));
  app.stage.interactive = true;
  app.stage.on('rightclick', toggleColor);
  app.stage.on('keydown', toggleColor);
}

function gameLoop(delta){
  for (let i = 0; i < cats.length; i++) {
    cats[i].x += cats[i].vx;
    cats[i].y += cats[i].vy;
  }
}

function createCat(){
  let newCat = new PIXI.Sprite.fromImage('https://i.gifer.com/4dI1.gif');
  newCat.y = 96; 
  newCat.vx = 1;
  newCat.vy = 1;  
  newCat.interactive = true;
  newCat.on('click', function(e){
    score = score + 1;
    message.text = "SCORE: " + score;
    app.stage.removeChild(this);
  });
  cats.push(newCat);
  app.stage.addChild(newCat);
}

function setupColorSwitcher() {
  colorSwitcher = new PIXI.Graphics();
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
  const color = createTintFilter(colors[currentColor]);
  colorSwitcher.filters = [color];
  app.stage.addChild(colorSwitcher);
}

function toggleColor() {
  if(currentColor === 0) {
    const color = createTintFilter(colors[1]);
    currentColor = 1;
    colorSwitcher.filters = [color];
  } else {
    const color = createTintFilter(colors[0]);
    currentColor = 0;
    colorSwitcher.filters = [color];
  };
}

function handleRightClick() {
}

function createTintFilter(tint) {
  const color = new PIXI.filters.ColorMatrixFilter();
  const r = tint >> 16 & 0xFF;
  const g = tint >> 8 & 0xFF;
  const b = tint & 0xFF;
  color.matrix[0] = r / 255;
  color.matrix[6] = g / 255;
  color.matrix[12] = b / 255;
  return color;
}
