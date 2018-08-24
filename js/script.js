var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var restart = document.getElementById("restart");

var cellZero = new Image();
cellZero.src = "./images/zero.svg";

var cellTwo = new Image();
cellTwo.src = "./images/2.svg";

var cellFour = new Image();
cellFour.src = "./images/4.svg";

var cell8 = new Image();
cell8.src = "./images/8.svg";

var cell16 = new Image();
cell16.src = "./images/16.svg";

var cell32 = new Image();
cell32.src = "./images/32.svg";

var cell64 = new Image();
cell64.src = "./images/64.svg";

var cell128 = new Image();
cell128.src = "./images/128.svg";

var cell256 = new Image();
cell256.src = "./images/256.svg";

var cell512 = new Image();
cell512.src = "./images/512.svg";

var cell1024 = new Image();
cell1024.src = "./images/1024.svg";

var cell2048 = new Image();
cell2048.src = "./images/2048.svg";

var width = 118.6; // canvas.width / 4 - 6
var cells = [];

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

function createCells(){
  for(var i = 0; i < 4; i++){
    cells[i] = [];
      for(var j = 0; j < 4; j++){
        cells[i][j] = new Cell(i, j);
      }
  }
}

function Cell(row, coll){
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}

function drawCell(Cell){
    ctx.beginPath();
    switch (Cell.value){
      case 0 : ctx.drawImage(cellZero, Cell.x, Cell.y, width, width);
        break;
      case 2 : ctx.drawImage(cellTwo, Cell.x, Cell.y, width, width);
        break;
      case 4 : ctx.drawImage(cellFour, Cell.x, Cell.y, width, width);
        break;
      case 8 : ctx.drawImage(cell8, Cell.x, Cell.y, width, width);
        break;
      case 16 : ctx.drawImage(cell16, Cell.x, Cell.y, width, width);
        break;
      case 32 : ctx.drawImage(cell32, Cell.x, Cell.y, width, width);
        break;
      case 64 : ctx.drawImage(cell64, Cell.x, Cell.y, width, width);
        break;
      case 128 : ctx.drawImage(cell128, Cell.x, Cell.y, width, width);
        break;
      case 256 : ctx.drawImage(cell256, Cell.x, Cell.y, width, width);
        break;
      case 512 : ctx.drawImage(cell512, Cell.x, Cell.y, width, width);
        break;
      case 1024 : ctx.drawImage(cell1024, Cell.x, Cell.y, width, width);
        break;
      case 2048 : ctx.drawImage(cell2048, Cell.x, Cell.y, width, width);
    }
}


function drawAllCells(){
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      drawCell(cells[i][j]);
      if(cells[i][j].value === 2048){
        winGame();
        return;
        }
    }
  }
}

function randomNewCell(){
  var freeCellsNumber = 0;
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if(cells[i][j].value === 0){
        freeCellsNumber++;
      }
    }
  }
  if(freeCellsNumber === 0){
    finishGame();
    return;
  }
  while(freeCellsNumber > 0){ 
  var row = Math.floor(Math.random() * 4);
  var coll = Math.floor(Math.random() * 4);
    if(cells[row][coll].value === 0){
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
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
      if(cells[i][j].value !== 0){
        coll = j;
          while (coll + 1 < 4){
            if (cells[i][coll + 1].value === 0){
              cells[i][coll + 1].value = cells[i][coll].value;
              cells[i][coll].value = 0;
              coll++;
            } else if (cells[i][coll].value === cells[i][coll + 1].value) {
              cells[i][coll + 1].value *= 2;
              score += cells[i][coll + 1].value;
              cells[i][coll].value = 0;
              break;
            } else {
              break;
            }
        }
      }
    }
  }
  randomNewCell();
}

function moveLeft(){
  var coll;
  for(var i = 0; i < 4; i++){
    for(var j = 1; j < 4; j++){
      if(cells[i][j].value !== 0){
        coll = j;
          while (coll - 1 >= 0){
            if (cells[i][coll - 1].value === 0){
              cells[i][coll - 1].value = cells[i][coll].value;
              cells[i][coll].value = 0;
              coll--;
            } else if (cells[i][coll].value === cells[i][coll - 1].value){
              cells[i][coll - 1].value *= 2;
              score += cells[i][coll - 1].value;
              cells[i][coll].value = 0;
              break;
            } else {
              break; 
            }
          }
      }
    }
  }
  randomNewCell();
}

function moveUp(){
  var row;
  for(var j = 0; j < 4; j++){
    for(var i = 1; i < 4; i++){
      if(cells[i][j].value !== 0){
        row = i;
          while (row > 0){
            if(cells[row - 1][j].value === 0){
              cells[row - 1][j].value = cells[row][j].value;
              cells[row][j].value = 0;
              row--;
            } else if (cells[row][j].value === cells[row - 1][j].value){
              cells[row - 1][j].value *= 2;
              score += cells[row - 1][j].value;
              cells[row][j].value = 0;
              break;
            } else {
              break; 
            }
          }
      }
    }
  }
  randomNewCell();
}

function moveDown(){
  var row;
  for(var j = 0; j < 4; j++){
    for(var i = 2; i >= 0; i--){
      if(cells[i][j].value !== 0){
        row = i;
          while (row + 1 < 4){
            if (cells[row + 1][j].value === 0){
              cells[row + 1][j].value = cells[row][j].value;
              cells[row][j].value = 0;
              row++;
            } else if (cells[row][j].value === cells[row + 1][j].value){
              cells[row + 1][j].value *= 2;
              score += cells[row + 1][j].value;
              cells[row][j].value = 0;
              break;
            } else {
              break; 
            }
          }
      }
    }
  }
  randomNewCell();
}

function startGame() {
  score = 0;
  createCells();
  drawAllCells();
  randomNewCell();
  randomNewCell();
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























