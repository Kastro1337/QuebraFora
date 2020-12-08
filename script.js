//get canvas width and height and etc
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// THE COLOR
const D_color = '#0095dd';

//random number generator
// nothing to see here





// score, lifes and etc
let score = 0;
var lives = 3;
var win = false;

//TODO: separar um arquivo apenas para classes

//ball class
//maybe more parameters should be add
class Ball{
  constructor(diameter){
    //this.diameter = diameter;
    this.size = diameter; // its width e height
    this.x = WIDTH/2;
    this.y = HEIGHT/2;
    this.dx = 4; // dx and dy are ball directions
    this.dy = 4; // on X and Y (boviously)
  }
  // guess what move function does
  move(){
    this.x += this.dx;
    this.y += this.dy;

  }
  // check collision on wall
  wallDetect(){
    // left and right wall collision check
    if(this.x + this.size > WIDTH || this.x - this.size < 0){
      this.dx *= -1 // CHUPA VALANDRO
    }
    // Ceiling collsiion check
    if(this.y - this.size < 0){
      this.dy *= -1
    }
  }

  // check collision with paddle and bouces back
  paddleDetect(other){
   //console.log(other.x) // debug to see if other.x is an object
    if(this.x - this.size > other.x && // check the left side
       this.x + this.size < other.x + other.width && // check the right side
     this.y + this.size > other.y){ // check if height on screen is "compatible"
       this.dy *= -1 // reverse
     }
  }



  // draw the ball on canvas
  draw(){
    // acctually, i didnt understood how it works, but it works
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); //circle
    ctx.fillStyle = D_color;
    ctx.fill();
    ctx.closePath();
  }
}

// pad class
// the player's favorite choice
class Pad{
  // pads is heavily based on canvas size
  // basically reactNative, i would say
  constructor(){
    this.width = WIDTH/10;
    this.height = HEIGHT/60;
    this.x = WIDTH/2 - (this.width/2);
    this.y = HEIGHT - this.height * 2;
    this.speed = WIDTH/100;
    this.dx = 0; // direction X

  }

  // gets key down, and change dx value
  keyDown(e){
    if(e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight'){
      this.dx = this.speed; // outrora isso era undefined
    }else if(e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft'){
      this.dx = -this.speed;// mas agora o pai ta chato vindo de nova
    }
  }
  // stops dx value once the key is realesd
  // can cause many bugs ;-;
  keyUp(e){
    if(
      e.key ==='d' || e.key === 'D' ||
      e.key === 'a' || e.key === 'A' ||
      e.key === 'ArrowLeft' || e.key === 'ArrowRight'
    ){
      this.dx = 0
    }
  }

  // move x based on dx value (either + or -)
  move(){
    this.x += this.dx;
  }
  // dont let the pad run away from the screen
  //also can cause glitches
  wallDetect(){
    if(this.x + this.width > WIDTH){
      this.x = WIDTH - this.width;  // direita
    }
    if(this.x < 0){
      this.x = 0;                   // esquerda
    }
  }

  // draw paddle, similar to ball.draw()
  // but is a rectangle
  draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    //console.log(this.x)
    ctx.fillStyle = D_color;
    ctx.fill();
    ctx.closePath();
  }
}

// Generating blocks outside a class
// Bcause everything went wrong :(
const brickInfo = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45, // values to deslocamento (displacemnet??)
  offsetY: 60, // horizontal n vertical
  exists: true
};
//acctually generate the bricks
function generateBricks(rowSize, columnSize){ // TODO: makes rowSize and columnSize upon canva's width and height
  brickRows = rowSize;
  brickColumns = columnSize;

  // mazzutti's famous matriz generator Ahead
  const array = [];
  for(let i=0; i<brickRows; i++){
    array[i] = [];
    for(let j=0; j<brickColumns; j++){
      const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
      const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
      array[i][j] = {x, y, ...brickInfo}; // puts the hole bricks info inside array
    }
  }
  return array
}

//draw the bricks, but need an array as argument ↑↑↑
// slightly different than ball.draw and pad.draw
// 'cause does it multiple times
function drawBricks(array){
  array.forEach(column => {     // .forEach is a simplified
    column.forEach(brick => {   // method instead of for(i=0;i<z;i++){}
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.exists ? D_color : "transparent"; // abracadabra, make the bricks dissapear
      ctx.fillStyle = D_color;
      ctx.fill();
      ctx.closePath();
    });
  });
}

// draw the text, like score and lifes
// call it a primitive HUD
function drawText(){
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);

}


// assemble all the draw functions and repeat it over
// also clear the canvas, to start it over a new frame
function drawScreen(){
  //clear canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // draw pretty much everything
  myball.draw();
  mypaddle.draw();
  drawBricks(bricksArray);
  drawText();
}

//generate objects
myball = new Ball(10); // args1 is ball diameter
mypaddle = new Pad();
const bricksArray = generateBricks(9, 5); // row and column size



// standart function to update
// (always on time)
function update(){

  //paddle
  mypaddle.move();
  mypaddle.wallDetect();

  //ball
  myball.move();
  myball.wallDetect();
  myball.paddleDetect(mypaddle);

  //drawings
  drawScreen();
  requestAnimationFrame(update);
}



//game running ↓



// add event listeners
document.addEventListener("keydown", function(event){           // JESUS FOI TAO DIFICIL
  mypaddle.keyDown(event);                                     // antes disso ele tava dando this.qualquercoisa como undefined
});
document.addEventListener("keyup",function(event){
  mypaddle.keyUp(event);
});




update();
//  "The bridge is not supported by one stone or another, but by the line of the arch that they form. Without stones there is no arch."
