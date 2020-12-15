/*
*
* Main file, game objects
* and all running in here
*
*/




//get canvas width and height and etc
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// THE COLOR
var D_color = '#0095dd';

var pause = false;

// random number generator
// nothing to see here


// set score (should it be hidden???)
let score = 0;



// draw the text, like score
// call it a primitive HUD
function drawText(){
  ctx.font = `${HEIGHT/40}px Arial`;
  ctx.fillText(`Score: ${score}`, WIDTH - 150,  HEIGHT/15);

}



// assemble all the draw functions and repeat it over
// also clear the canvas, to start a new frame
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

  if(!pause){
    //paddle
    mypaddle.move();
    mypaddle.wallDetect();

    //ball
    myball.move();
    myball.wallDetect();
    myball.paddleDetect(mypaddle);

    //bricks
    bricksCollision(bricksArray, myball);

    //drawings
    drawScreen();
    requestAnimationFrame(update);
  }
}

// restart the game wehn ball hits the ground
function restartGame(){
  score = 0; // restart score
  bricksArray.forEach(column => {
    column.forEach(brick => {
      // restore all the bricks
      brick.exist = true;
    });
  });
}

function pauseGame() { //TODO: game.pause()
  if(!pause){
    pause = true;
  }else{
    pause = false;
    update();
  }
}

//game running ↓



// add event listeners
document.addEventListener("keydown", function(event){

  if(event.key == " "){
    pauseGame();
  }
  mypaddle.keyDown(event);
});
document.addEventListener("keyup",function(event){
  mypaddle.keyUp(event);
});

update();

/*
*   @author Angelo Castro <@github.com/Kastro1337/>
*
*   "The bridge is not supported by one stone or another, but by the line of the arch that they form. Without stones there is no arch."
*/
