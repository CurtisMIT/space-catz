const PIXI = require('pixi.js');
const filters = require('pixi-filters');

app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x2e3131});
document.body.appendChild(app.view);

let background = new PIXI.Sprite.fromImage("https://i.ibb.co/mywwWzP/background.png");
background.width = window.innerWidth;
app.stage.addChild(background);

const colors = [0x2ed573, 0xe056fd]
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
let hearts = [];

PIXI.loader
  .load(setup)
  .load(setupColorSwitcher);

function setup() {
  message.position.set(window.innerWidth - 400, 75);
  app.stage.addChild(message);
  createHearts();
  app.ticker.add(delta => gameLoop(delta));
  app.stage.interactive = true;
  app.stage.on('rightclick', toggleColor);
  app.stage.on('keydown', toggleColor);
  catLoop();
}

function catLoop() {
  let rand = Math.round(Math.random() * (1200 - 500)) + 300;
  setTimeout(function() {
    createCat();
    catLoop();
  }, rand);
}

function gameLoop(delta){
  let deleteIndex = [];
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
      deleteIndex.push(i);
    }
  }
  cats = cats.filter((value, index) => {
    return !deleteIndex.includes(index); 
  })

  if (hearts.length == 0){
    alert("GAME OVER\nREFRESH TO PLAY AGAIN");
    //createHearts();
  }
 

}

function createHearts(){
  
  let heart1 = new PIXI.Sprite.fromImage('https://i.gifer.com/DDg.gif');
  let heart2 = new PIXI.Sprite.fromImage('https://i.gifer.com/DDg.gif');
  let heart3 = new PIXI.Sprite.fromImage('https://i.gifer.com/DDg.gif');

  hearts.push(heart1);
  hearts.push(heart2);
  hearts.push(heart3);
  
  heart1.height = 100;
  heart1.width = 100;
  heart2.height = 100;
  heart2.width = 100;
  heart3.height = 100;
  heart3.width = 100;

  heart1.y = 10;
  heart1.x = 10;
  heart2.y = 10;
  heart2.x = 120;
  heart3.y = 10;
  heart3.x = 230
  app.stage.addChild(heart1);
  app.stage.addChild(heart2);
  app.stage.addChild(heart3);
}

function createCat(){
  const randomChance = Math.random();
  const catUrl = randomChance < 0.5 ? 'https://i.ibb.co/mRfG372/greencat.png' : 'https://i.ibb.co/vLwDfzv/purplecat.png';
  let newCat = new PIXI.Sprite.fromImage(catUrl);
  newCat.color = randomChance < 0.5 ? 0 : 1;
  newCat.width = 142;
  newCat.height = 150;
  newCat.y = 0;
  newCat.x = Math.random() * (window.innerWidth - newCat.width); 
  newCat.vx = Math.random() * 4 + 3;
  newCat.vy = Math.random() * 4 + 3;  
  if (newCat.x > window.innerWidth/2){
    newCat.vx = -newCat.vx;
  }
  
  newCat.interactive = true;
  newCat.on('click', function(e){
    if (newCat.color === currentColor) {
      score = score + 1;
      message.text = "SCORE: " + score;
      app.stage.removeChild(this);
      cats = cats.filter((value, index) => {
        return index != cats.indexOf(newCat);
      });
    }
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
  glowFilter = new filters.GlowFilter(50, 1, 1, colors[currentColor]);
  colorSwitcher.filters = [color, glowFilter];
  app.stage.addChild(colorSwitcher);
}

function toggleColor() {
  let glowFilter;
  let color;
  if(currentColor === 0) {
    glowFilter = new filters.GlowFilter(50, 1, 1, colors[1]);
    color = createTintFilter(colors[1]);
    currentColor = 1;
  } else {
    glowFilter = new filters.GlowFilter(50, 1, 1, colors[0]);
    color = createTintFilter(colors[0]);
    currentColor = 0;
  };
  colorSwitcher.filters = [color, glowFilter];
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

