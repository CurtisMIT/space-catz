let app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x2ad999});
document.body.appendChild(app.view);

let stage = new PIXI.Container();

let ballSize = 10;
let circles = [];

app.ticker.add(
  (delta) => {
    ballSize += 1; 
  }
);
