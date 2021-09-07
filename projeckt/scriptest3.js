canvas=document.getElementById("canvas");
ctx=canvas.getContext('2d');


var bubble=new Image();
bubble.onload=drow;
bubble.src="bubble.png"
    

var  tileheight=40;
var tilewidth=40;
var level={
    
    rows:canvas.offsetHeight/tilewidth,
    columns:canvas.offsetWidth/tileheight,
    column:tileheight,
    row:tilewidth,
    tiles:[],
}

function render(){
    for(let i=0;i<level.rows;i++){
        level.tiles[i]=[];
        for(let k=0;k<level.columns;k++){
            var cord= getcoordinate(k,i);
            var type=randomDiap(0,6)
            level.tiles[i][k]={cord,type};
              drow(k,i);  
        }
    }
}
function getcoordinate(column,row){
    var tilex=column*tilewidth;
    if(row%2){
        tilex+=tilewidth/2;

    }
    var tiley=row*tileheight;
    return {tilex:tilex,tiley:tiley}
}

function drow(column,row){
   ctx.fillStyle="#6beeff";
   
 
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
  /*   ctx.strokeStyle='red';
        ctx.beginPath();
        ctx.strokeRect(level.tiles[row][column].cord.tilex,level.tiles[row][column].cord.tiley, tilewidth,tileheight)
        ctx.stroke(); */
     level.tiles.forEach(b=>{b.forEach(a=>{

        ctx.strokeStyle='red';
        ctx.beginPath();
       // ctx.strokeRect(a.cord.tilex,a.cord.tiley, tilewidth,tileheight)
       ctx.drawImage(bubble,tilewidth*a.type,0,tilewidth,tileheight,a.cord.tilex,a.cord.tiley,tilewidth,tileheight)
        ctx.stroke();
     })
      
       
    }) 
   
}
function randomDiap(n,m) {
    return Math.floor(
      Math.random()*(m-n+1)
      )+n;
  }
 
render();
