
var canvas;
var ctx;
var blocksArray = [];
var blockWidth=20;
var blockHeight=20;
var delay = 150;
var nextCommand = false;
var fieldWidth=window.innerWidth;
var fieldHeight=window.innerHeight/100*70;
var snakeDark = "#000000";
var snake = "#00ff00";
var apple = "#ff0000";
var score = 1;
var applePos;
var pushOne = false;
var gameRunning = true;
var path = [[[0, 1], "down"], [[0, 0], "down"]];

function initCanvas (width, height){
  canvas = document.getElementById("canvas");
  canvas.width = fieldWidth;
  canvas.height = fieldHeight;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(10, 10, 10, 10);
}

function createBlocks (width, height){
  for(var i = 0;i<Math.floor(fieldWidth/width);i++){
    blocksArray.push([]);
    for(var z = 0;z<Math.floor(fieldHeight/height);z++){
      blocksArray[i].push({color: "#000000"});
    }
  }
}

function loadBlocks (width, height){
  for(var i = 0;i<blocksArray.length;i++){
    for(var z = 0;z<blocksArray[i].length;z++){
      if(blocksArray[i][z].color){
        ctx.fillStyle=blocksArray[i][z].color;
      }
      ctx.fillRect(i*width, z*height, width, height);
    }
    }
}
initCanvas();
createBlocks(blockWidth, blockHeight);
genApple();
loadBlocks(blockWidth, blockHeight);



//Game

function updateSnake (){
  for(var x = 0;x<path.length;x++){
    blocksArray[path[x][0][0]][path[x][0][1]].color = snakeDark;
  }
  for(var i = path.length-1;i>=0;i--){
    if(i !== 0){
      if(pushOne&&i==path.length-1){
        pushOne=false;
        path.push([[path[i][0][0], path[i][0][0]], "down"]);
      }
    path[i][0][0]=path[i-1][0][0];
    path[i][0][1]=path[i-1][0][1];
    }
    else{
      var nextCmd = path[0][1];
      var nextCord = path[0][0];
      if(nextCommand){
        if(!((nextCommand == "up" && path[0][1] == "down")||(nextCommand == "down" && path[0][1] == "up")||(nextCommand == "left" && path[0][1] == "right")||(nextCommand == "right" && path[0][1] == "left"))){
        
        nextCmd = nextCommand;}
        nextCommand = false;
      }
      if(nextCmd == "up"){
        nextCord[1]--;
        path[0][1]="up";
      }
      if(nextCmd == "down"){
        nextCord[1]++;
        path[0][1]="down";
      }
      if(nextCmd == "left"){
        nextCord[0]--;
        path[0][1]="left";
      }
      if(nextCmd == "right"){
        nextCord[0]++;
        path[0][1]="right";
      }
      path[0][0]=nextCord;
      if((path[0][0][0]<0)||(path[0][0][0]>=blocksArray.length)||(path[0][0][1]<0)||(path[0][0][1]>=blocksArray[0].length||blocksArray[path[0][0][0]][path[0][0][1]].color == snake)){
        gameRunning = false;
        return;
      }
    }
    if(blocksArray[path[i][0][0]][path[i][0][1]].color==apple){
      score++;
      genApple();
      pushOne = true;
      console.log(score);
    }
    blocksArray[path[i][0][0]][path[i][0][1]].color = snake;
  }
}
function genApple (){
  var pos =[];
  for(var i = 0;i<blocksArray.length;i++){
    for(var z = 0;z<blocksArray[i].length;z++){
      if(blocksArray[i][z].color == snakeDark){
        pos.push([i, z]);
      }
    }
    }
    var rpos = Math.floor(Math.random()*pos.length);
    blocksArray[pos[rpos][0]][pos[rpos][1]].color=apple;
    applePos = rpos[0];
}
function update (){
  updateSnake();
  loadBlocks(blockWidth, blockHeight);
  if(gameRunning){
  window.setTimeout(update, delay);
  }
  else{
    alert("GameOver\nScore: "+score);
  }
}
update();