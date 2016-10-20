var globalOrder = 0;
var domino1 = new domino(-140,1);
var domino2 = new domino(-85,2);
var domino3 = new domino(-30,3);
var domino4 = new domino(25,4);
var domino5 = new domino(80,5);
var domino6 = new domino(135,6);
var slider, sliderValue;
var canvas;
var h = 35;
var w = 20;
var moving = 0;
var canvas2;
var textPosition = [645,240];
var texts = ['a', 'b'];
var buttonCreated = 1;

function setup() {
  canvas = createCanvas(900, 500);
  canvas.position(190, 140);
  canvas.parent("canvas_container");
  slider = createSlider(0, 255, 0);
  slider.position(36, 162);
  slider.style('width', '150px');
  smooth();
}

function draw() {
  if (slider.value() == 255) {
    start();
  }
  if (globalOrder === 1) {
    moving++;
  }

  background('#f7f7f7');
  domino1.draw();
  domino2.draw();
  domino3.draw();
  domino4.draw();
  domino5.draw();
  domino6.draw();
  ballSlider(0,50);
  fill(30, 144, 255);
  textualArrows();
}

function domino(offset,order) {
  this.x1 = 0;
  this.y1 = -55;
  this.x2 = 0;
  this.y2 = 0;
  this.angle = 0;
  this.draw = function() {
    push();
    translate(width/2+offset, height/2);
    if ((globalOrder >= order+1) && (this.angle < 81)){
      this.angle++;
    }
    if (this.angle == 60) {
      globalOrder ++;
    }
    rotate(radians(this.angle));
    stroke(30, 144, 255);
    line(this.x1, this.y1, this.x2, this.y2);
    line(this.x1, this.y2, this.x2 - 10, this.y2);
    line(this.x1, this.y1, this.x2 - 10, this.y1);
    line(this.x1 - 10, this.y1, this.x2 - 10, this.y2);
    line(this.x1, this.y1, this.x2 - 10, this.y1 - 10);
    line(this.x1 - 10, this.y1, this.x2 - 20, this.y1 - 10);
    line(this.x1 - 20, this.y1 - 10, this.x2 - 10, this.y1 - 10);
    line(this.x1 - 20, this.y1 - 10, this.x1 - 20, this.y2 - 10);
    line(this.x1 - 20, this.y2 - 10, this.x2 - 10, 0);
    pop();
  };
}

function start() {
  if (globalOrder === 0) {
    globalOrder = 1;
  }
}

function ballSlider(x,y){
  // x = 0 ; y = 50
  push();
  stroke(30, 144, 255);
  fill('#f7f7f7');
  line(x, y, x+120, y);
  line(x+10, y+10, x+130, y+10);
  line(x, y, x+10, y+10);
  line(x+120, y, x+280, y+160);
  line(x+70, y+10, x+210, y+160);
  line(x+210, y+160, x+280, y+160);
  line(x+200, y+170, x+270, y+170);
  line(x+200, y+170, x+210, y+160);
  line(x+270, y+170,x+280, y+160);
  line(x+70, 60, x+60, y+20);
  line(x+20, 70, x+60, y+20);
  line(x+10, 60, x+20, y+20);
  line(x+60, 70,x+200, y+170);
  ellipse(w, h, 40);
  if ((moving % 2 > 0) && (w < 281)) {
    w = w + 3;
    if (w > 80) {
      h = h + 3;
    }
  }
  if (w == 269) {
    globalOrder++;
  }
  pop();
}

function textualArrows(){
  if (!(globalOrder >= 8) || !(domino6.angle > 80)) {
    text('|–->', textPosition[0],textPosition[1]);
  }
  else if ((globalOrder === 8) && (domino6.angle > 80)){
    text('/', 645,240);
    textPosition[0] = textPosition[0] + 2;
    text('–->', textPosition[0],textPosition[1]);
    if (textPosition[0] === (width - 39)){
      globalOrder++;
    }
  }
  if (globalOrder === 9) {
    textPosition[1] = textPosition[1] + 2;
    text(' | ', textPosition[0],textPosition[1]);
    text('\\ /', textPosition[0],textPosition[1]+8);
    if (textPosition[1] === (height - 130)){
      globalOrder++;
    }
  }
  if (globalOrder === 10) {
    textPosition[0] = textPosition[0] - 2;
    text('<-–', textPosition[0],textPosition[1]);
    if (textPosition[0] === (width / 2 - 1)){
      globalOrder++;
    }
  }
  if (globalOrder === 11) {
    text('<-–', textPosition[0],textPosition[1]);
    if (buttonCreated === 1){
      var button = createButton("RESTART");
      button.position(550,493);
      button.id('restart');
      button.mouseClicked(reload);
      buttonCreated=2;
    }
  }
}

function reload(){
  location.reload();
}
