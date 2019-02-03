app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x2e3131});
document.body.appendChild(app.view);

let background = new PIXI.Sprite.fromImage("https://i.ibb.co/mywwWzP/background.png");
background.width = window.innerWidth;
app.stage.addChild(background);

var stage = new PIXI.Container();
document.body.appendChild(app.view);

const colors = [0x2ed573, 0xff6b81]
let currentColor = 0;

let style = new PIXI.TextStyle({
  fontFamily: "Orbitron",
  fontSize: 36,
  fill: "white",
  dropShadow: true,
  dropShadowColor: "#1e90ff",
  dropShadowBlur: 10
});

let message = new PIXI.Text("SCORE: 0", style);
let cats = [];
let score = 0;
let colorSwitcher;

PIXI.loader
  .load(setup)
  .load(setupColorSwitcher);

function setup() {
  //Position it and add it to the stage
  message.position.set(window.innerWidth - 400, 75);
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
  newCat.y = 0;
  newCat.x = Math.random() * window.innerWidth; 
  newCat.vx = Math.random() * 5 + 3;
  newCat.vy = Math.random() * 5 + 3;  
  if (newCat.x > window.innerWidth/2){
    newCat.vx = -newCat.vx;
  }  
  newCat.interactive = true;
  newCat.on('click', function(e){
    score = score + 1;
    message.text = "SCORE: " + score;
    app.stage.removeChild(this);
    createCat();
    
  });
  cats.push(newCat);
  app.stage.addChild(newCat);
}

function setupColorSwitcher() {
  colorSwitcher = new PIXI.Graphics();
  const colorSwitcherWidth = 300;
  const colorSwitcherHeight = 120;
  
  colorSwitcher.beginFill(0xffffff, 1);
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
  let color;
  if(currentColor === 0) {
    color = createTintFilter(colors[1]);
    currentColor = 1;
  } else {
    color = createTintFilter(colors[0]);
    currentColor = 0;
  };
  colorSwitcher.filters = [color];
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
