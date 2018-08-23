var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var restart = document.getElementById("restart");

var squareZero = new Image();
squareZero.src = "./images/zero.svg";

var squareTwo = new Image();
squareTwo.src = "./images/2.svg";

var squareFour = new Image();
squareFour.src = "./images/4.svg";

var square8 = new Image();
square8.src = "./images/8.svg";

var square16 = new Image();
square16.src = "./images/16.svg";

var square32 = new Image();
square32.src = "./images/32.svg";

var square64 = new Image();
square64.src = "./images/64.svg";

var square128 = new Image();
square128.src = "./images/128.svg";

var square256 = new Image();
square256.src = "./images/256.svg";

var square512 = new Image();
square512.src = "./images/512.svg";

var square1024 = new Image();
square1024.src = "./images/1024.svg";

var square2048 = new Image();
square2048.src = "./images/2048.svg";

var width = 118.6; // canvas.width / 4 - 6
var squares = [];

var win = false;
var loss = false;

var score = 0;
var selectScore = document.getElementById("score");

//---------------------------------------------------------

$(document).ready(function(){
    startGame()
});

restart.onclick = function (){
    canvasClean();
    startGame();
}

function canvasClean(){
  loss = false;
  win = false;
  score = 0;
  selectScore.innerHTML = score;
  canvas.style.opacity = '1';
  ctx.clearRect(0, 0, 500, 500);
}

function createSquares(){
  for(var i = 0; i < 4; i++){
    squares[i] = [];
      for(var j = 0; j < 4; j++){
        squares[i][j] = new Square(i, j);
      }
  }
}

// coll 0, 1, 2, 3
// row  0, 1, 2, 3
function Square(row, coll){
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}

function drawSquare(Square){
    ctx.beginPath();
    switch (Square.value){
      case 0 : ctx.drawImage(squareZero, Square.x, Square.y, width, width);
        break;
      case 2 : ctx.drawImage(squareTwo, Square.x, Square.y, width, width);
        break;
      case 4 : ctx.drawImage(squareFour, Square.x, Square.y, width, width);
        break;
      case 8 : ctx.drawImage(square8, Square.x, Square.y, width, width);
        break;
      case 16 : ctx.drawImage(square16, Square.x, Square.y, width, width);
        break;
      case 32 : ctx.drawImage(square32, Square.x, Square.y, width, width);
        break;
      case 64 : ctx.drawImage(square64, Square.x, Square.y, width, width);
        break;
      case 128 : ctx.drawImage(square128, Square.x, Square.y, width, width);
        break;
      case 256 : ctx.drawImage(square256, Square.x, Square.y, width, width);
        break;
      case 512 : ctx.drawImage(square512, Square.x, Square.y, width, width);
        break;
      case 1024 : ctx.drawImage(square1024, Square.x, Square.y, width, width);
        break;
      case 2048 : ctx.drawImage(square2048, Square.x, Square.y, width, width);
    }
}


function drawAllSquares(){
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      drawSquare(squares[i][j]);
      if(squares[i][j].value === 2048){
        winGame();
        return;
        }
    }
  }
}

function randomNewSquare(){
  var freeSquaresNumber = 0;
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if(squares[i][j].value === 0){
        freeSquaresNumber++;
      }
    }
  }
  if(freeSquaresNumber === 0){
    finishGame();
    return;
  }
  while(freeSquaresNumber > 0){ 
  var row = Math.floor(Math.random() * 4);
  var coll = Math.floor(Math.random() * 4);
    if(squares[row][coll].value === 0){
      squares[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      drawAllSquares();
      return;
    }   
  }
}

document.onkeydown = function (event){
  if (loss === false && win === false){
    switch (event.keyCode){
      case 37: moveLeft();
        break;   
      case 38: moveUp();
        break;  
      case 39: moveRight();
        break; 
      case 40: moveDown(); 
    }
  }
  selectScore.innerHTML = score;
}

function moveRight(){
  var coll;
  for(var i = 0; i < 4; i++){
    for(var j = 2; j >= 0; j--){
      if(squares[i][j].value !== 0){
        coll = j;
          while (coll + 1 < 4){
            if (squares[i][coll + 1].value === 0){
              squares[i][coll + 1].value = squares[i][coll].value;
              squares[i][coll].value = 0;
              coll++;
            } else if (squares[i][coll].value === squares[i][coll + 1].value) {
              squares[i][coll + 1].value *= 2;
              score += squares[i][coll + 1].value;
              squares[i][coll].value = 0;
              break;
            } else {
              break;
            }
        }
      }
    }
  }
  randomNewSquare();
}

function moveLeft(){
  var coll;
  for(var i = 0; i < 4; i++){
    for(var j = 1; j < 4; j++){
      if(squares[i][j].value !== 0){
        coll = j;
          while (coll - 1 >= 0){
            if (squares[i][coll - 1].value === 0){
              squares[i][coll - 1].value = squares[i][coll].value;
              squares[i][coll].value = 0;
              coll--;
            } else if (squares[i][coll].value === squares[i][coll - 1].value){
              squares[i][coll - 1].value *= 2;
              score += squares[i][coll - 1].value;
              squares[i][coll].value = 0;
              break;
            } else {
              break; 
            }
          }
      }
    }
  }
  randomNewSquare();
}

function moveUp(){
  var row;
  for(var j = 0; j < 4; j++){
    for(var i = 1; i < 4; i++){
      if(squares[i][j].value !== 0){
        row = i;
          while (row > 0){
            if(squares[row - 1][j].value === 0){
              squares[row - 1][j].value = squares[row][j].value;
              squares[row][j].value = 0;
              row--;
            } else if (squares[row][j].value === squares[row - 1][j].value){
              squares[row - 1][j].value *= 2;
              score += squares[row - 1][j].value;
              squares[row][j].value = 0;
              break;
            } else {
              break; 
            }
          }
      }
    }
  }
  randomNewSquare();
}

function moveDown(){
  var row;
  for(var j = 0; j < 4; j++){
    for(var i = 2; i >= 0; i--){
      if(squares[i][j].value !== 0){
        row = i;
          while (row + 1 < 4){
            if (squares[row + 1][j].value === 0){
              squares[row + 1][j].value = squares[row][j].value;
              squares[row][j].value = 0;
              row++;
            } else if (squares[row][j].value === squares[row + 1][j].value){
              squares[row + 1][j].value *= 2;
              score += squares[row + 1][j].value;
              squares[row][j].value = 0;
              break;
            } else {
              break; 
            }
          }
      }
    }
  }
  randomNewSquare();
}

function startGame() {
  score = 0;
  createSquares();
  drawAllSquares();
  randomNewSquare();
  randomNewSquare();
}

var gameOver = new Image();
gameOver.src = "./images/game-over-14.svg";

function finishGame(){
  loss = true;

  ctx.opacity = '1';
  ctx.drawImage(gameOver, 0, 0, 500, 500);

  document.onclick = function(){
    canvasClean();
    startGame();
  }
}

var winImg = new Image();
winImg.src = "./images/win-15.svg";

function winGame(){

  win = true;
  ctx.opacity = '1';
  ctx.drawImage(winImg, 0, 0, 500, 500);

  document.onclick = function(){
    canvasClean();
    startGame();
  }
}























