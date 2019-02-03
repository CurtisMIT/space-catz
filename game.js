app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x2ad999});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x061639;

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
let hearts = [];
// let heart1 = new PIXI.Sprite.fromImage('https://i.gifer.com/DDg.gif');
// let heart2 = new PIXI.Sprite.fromImage('https://i.gifer.com/DDg.gif');
// let heart3 = new PIXI.Sprite.fromImage('https://i.gifer.com/DDg.gif');


PIXI.loader
  .load(setup)
  .load(setupColorSwitcher);

function setup() {
  //Position it and add it to the stage
  message.position.set(1200, 70);
  app.stage.addChild(message);
  createHearts();
  createCat();
  
  
  app.ticker.add(delta => gameLoop(delta));
  
}

function gameLoop(delta){
  for (let i = 0; i < cats.length; i++) {
    cats[i].x += cats[i].vx;
    cats[i].y += cats[i].vy;
    
    if (cats[i].x + cats[i].width > window.innerWidth || cats[i].x < 0){
      cats[i].vx = -cats[i].vx;
    }
    if (cats[i].y + cats[i].height > window.innerHeight){
      app.stage.removeChild(cats[i]);
      app.stage.removeChild(hearts[hearts.length - 1]);
      hearts.pop();

    }
  }
}

function createHearts(){
  
  let heart1 = new PIXI.Sprite.fromImage('https://i.gifer.com/DDg.gif');
  let heart2 = new PIXI.Sprite.fromImage('https://i.gifer.com/DDg.gif');
  let heart3 = new PIXI.Sprite.fromImage('https://i.gifer.com/DDg.gif');

  hearts.push(heart1);
  hearts.push(heart2);
  hearts.push(heart3);
  

  heart1.height = 142;
  heart1.width = 150;
  heart2.height = 142;
  heart2.width = 150;
  heart3.height = 142;
  heart3.width = 150;

  heart1.y = 0;
  heart2.x = 130;
  heart3.x = 260
  app.stage.addChild(heart1);
  app.stage.addChild(heart2);
  app.stage.addChild(heart3);
}



function createCat(){
  let newCat = new PIXI.Sprite.fromImage('https://i.gifer.com/4dI1.gif');
  newCat.width = 142;
  newCat.height = 150;
  newCat.y = 0;
  newCat.x = Math.random() * (window.innerWidth - newCat.width); 
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
  if (newCat.y == window.innerHeight){
    app.stage.removeChild(heart3);
    createCat();
  }
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

function handleLeftClick() {
  if(currentColor === 1) {
    const color = createTintFilter(colors[0]);
    currentColor = 0;
    colorSwitcher.filters = [color];
  };
}

function handleRightClick() {
  if(currentColor === 0) {
    const color = createTintFilter(colors[1]);
    currentColor = 1;
    colorSwitcher.filters = [color];
  };
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
