const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const D_color = '#0095dd';





var WIDTH = canvas.width;
var HEIGHT = canvas.height;

let score = 0;
var lives = 3;

var win = false;

//TODO: separar um arquivo apenas para classes

class Ball{
  constructor(diameter){
    //this.diameter = diameter;
    this.size = diameter; // ja eh width e height
    this.x = WIDTH/2;
    this.y = HEIGHT/2;
    this.dx = 4; // dx e dy são a movimentação da bola
    this.dy = -4; // na direção X e Y
  }
  draw(){ // desenha a bola no canvas
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); //circle
    ctx.fillStyle = D_color;
    ctx.fill();
    ctx.closePath();
  }

}

class Pad{ // pad do jogador
  constructor(w, h){
    this.width = w;
    this.height = h;
    this.x = WIDTH/2 - 40;
    this.y = HEIGHT -20; //?????
    this.speed = 8;
    this.dx = 0;
  }
  draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = D_color;
    ctx.fill();
    ctx.closePath();
  }
}

//TODO: transformar em classe ↓↓↓
//cria os tijolos
/*
//DEU TUDO ERRADO, VOU FAZER SEM CLASSE. literalmente e figurativamente
class Block {
  constructor(w, h) {
    this.offsetX = 45   // valores do deslocamento de X e Y
    this.offsetY = 60  // sao os do bloco inicial
    this.width = w;
    this.height = h;
    this.padding = 10 // espac(s)amento??
    this.exists = true;
    this.blocks = [];
    this.x = 0; // valores serao
    this.y = 0; // assignados depois
  }

  generate(){ // gera o numero de fileiras e colunas de blocos
    const blockRow = 9;
    const blockColumn = 5;
    for(let i = 0; i< blockRow; i++) {
    this.blocks[i] = [];
      for(let j = 0; j < blockColumn; j++){
        const this.x = 1//= i * (this.width + this.padding)+this.offsetX;    // dita as posicoes X e Y
        const this.y = j * (this.height + this.padding)+this.offsetY;   // para cada bloco separado
        this.blocks[i][j] = {this.x, this.y , this.offsetX, this.offsetY, this.width, this.height ,this.padding, this.exists } // bastante coisa :(
      }
    }
  draw(){
    this.blocks.forEach(column => {
      column.forEach(block => {
        ctx.beginPath();
        ctx.rect(block.x, block.y, block.width, block.height);
        ctx.fillStile = brick.exists ? D_color ; 'transparent';
        ctx.fill();
        ctx.closePath();

      });


    });


    }
  }*/


// Gerando os blocos sem classe
// pois deu tudo errado :(
const brickInfo = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45, // valores para o deslocamento
  offsetY: 60, // horizontal e vertical
  exists: true
};
function generateBricks(rowSize, columnSize){
  brickRows = rowSize;
  brickColumns = columnSize;

  // Famoso matriz generator a frente
  const array = [];
  for(let i=0; i<brickRows; i++){
    array[i] = [];
    for(let j=0; j<brickColumns; j++){
      const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
      const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
      array[i][j] = {x, y, ...brickInfo};
    }
  }
  return array
}

function drawBricks(array){
  console.log("debug 1")
  console.log(array)
  array.forEach(column => {
    column.forEach(brick => {
      console.log("debug 2")
      console.log(brick)
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      //ctx.fillStyle = brick.exists ? D_color : console.log("seu burro");
      ctx.fillStyle = "#0095dd"
      ctx.fill();
      ctx.closePath();
    });
  });
}




function drawScreen(){
  myball.draw();
  mypaddle.draw();
  drawBricks(bricksArray);
  drawText();
}

function drawText(){
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);

}



//game running ↓
myball = new Ball(10);
mypaddle = new Pad(80, 10);
const bricksArray = generateBricks(9, 5);


drawScreen()
