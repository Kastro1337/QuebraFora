/*
*
*   Class file.
*   Ball, and Paddle class are in here
*   Bricks is not a class, but is close enough
*
*/



//  ball class
//  maybe more parameters should be add
class Ball{
  constructor(diameter){

    this.size = diameter; // its width e height
    this.x = WIDTH/2;
    this.y = HEIGHT/2;
    this.dx = 4; // dx and dy are ball directions
    this.dy = 5; // on X and Y (boviously)
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
    if(this.y + this.size > HEIGHT){
      // reset the game
      // or restart game
      restartGame(); //TODO: classe Game.restart();
      this.x = WIDTH/2
      this.y = HEIGHT/2
    }
  }

  // check collision with paddle and bouces back
  paddleDetect(other){
   //console.log(other.x) // debug to see if other.x is an object
    if(this.x - this.size > other.x && // check the left side
       this.x + this.size < other.x + other.width && // check the right side
     this.y + this.size > other.y){ // check if height on screen is "compatible"
       this.dy *= -1; // reverse
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
{ // remove this and line 206 +/- in case of bugs
const brickInfo = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45, // values to deslocamento (displacemnet??)
  offsetY: 60, // horizontal n vertical
  exist: true
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
      array[i][j] = {x, y, ...brickInfo}; // puts the whole bricks info inside array
    }
  }
  return array
}
//Bricks collision
function bricksCollision(array, ball){
  array.forEach(column => {
    column.forEach(brick => {
      if(brick.exist){
        if(
          ball.x - ball.size > brick.x &&                // check the left side
          ball.x + ball.size < brick.x + brick.width &&  // check the right side
          ball.y + ball.size > brick.y &&                // check the top side
          ball.y - ball.size < brick.y + brick.height    // check the bottom side
        ){ // then
          brick.exist = false // remove from EXISTENCE º-º
          ball.dy *= -1       // reverse vertically (remember that)
          score +=1
        }
      }
    });
  });
}

//draw the bricks, but need an array as argument
// slightly different than ball.draw and pad.draw
// 'cause does it multiple times
function drawBricks(array){
  array.forEach(column => {     // .forEach is a simplified
    column.forEach(brick => {   // method instead of for(i=0;i<z;i++){}
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.exist ? D_color : "transparent" ; // abracadabra, make the bricks dissapear
      ctx.fill();
      ctx.closePath();
    });
  });
}
}

/*
*
*   @author Angelo Castro <@github.com/Kastro1337/>
*
*/
