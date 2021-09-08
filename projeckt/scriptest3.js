canvas=document.getElementById("canvas");
ctx=canvas.getContext('2d');


var bubble=new Image();
bubble.onload=drow;
bubble.src="bubble.png"
    
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq

  var arcX  = 320;
  var arcY = 338;
  var lineX = 0;
  var lineY = 0;

  
var count=document.getElementById("count")
  var bullets = [];  // массив снарядов
 

  
  canvas.addEventListener('mousemove', function (e) {
     lineX = e.layerX;
     lineY = e.layerY;
  })

  canvas.addEventListener('click', function (e) {
     let x = e.layerX - arcX;
     let y = e.layerY - arcY;
     let max = Math.max(Math.abs(x), Math.abs(y));
    let xx=x/max;
    let yy= y/max;
     // по клику добавляем информацию о  снаряде в массив  
     bullets.push({
       to: [xx,yy], // нормализованный вектор движения
       pos: [arcX,arcY], // положение 
     });
  })
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
var  tileheight=40;
var tilewidth=40;
var rowheight=35;
var level={
    
    rows:canvas.offsetHeight/tilewidth/2,
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
requestAnimationFrame(drow)
function getcoordinate(column,row){
    var tilex=(column)*tilewidth;
    if((row)%2){
        
        tilex+=tilewidth/2;
     /* if(column==level.columns-1){
            
        }  */
    }
    var tiley=row*rowheight;//нужно устранить зазар между строками переменной ровхейст меньше высоту шарика 
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
     //qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
     ctx.beginPath();
    ctx.arc(arcX, arcY, 22, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(arcX,arcY);
    ctx.lineTo(lineX,lineY);
    ctx.stroke();
     bullets.forEach(b => {
        //сдвигаем снаряд на значение вектора 
        b.pos[0] += b.to[0];  
        b.pos[1] += b.to[1]; 
        if(b.pos[0]==10 ||b.pos[0]==canvas.width-10 ){
            b.to[0]=-b.to[0];
           
          
        }
        if(b.pos[1]<canvas.offsetTop+10){
            b.to[0]=0;
            b.to[1]=0;
        }
        
        for(let q=0;q<level.tiles[5-1].length;q++){

            if(b.pos[1]<level.tiles[5-1][q].cord.tiley+tileheight&&b.pos[0]>level.tiles[5-1][q].cord.tilex-tilewidth&&b.pos[0]<level.tiles[5-1][q].cord.tilex+tilewidth){
                b.to[0]=0;
                b.to[1]=0;
                b.pos[1]=level.tiles[5-1][q].cord.tiley+tileheight;
                b.pos[0]=level.tiles[5-1][q].cord.tilex-tilewidth/2;
                level.tiles[5]=[];
                level.tiles[5][q]={cord:{tilex: b.pos[0], tiley: b.pos[1]},type:0}
            }
        }
        
      /*   if(b.pos[1]>cordb&&b.pos[1]<cordb){
            b.to[0]=0;
            b.to[1]=0;
        } */
       /*  level.tiles.forEach(b=>{b.forEach(a=>{
            if(a.cord.tiley==bullets.forEach(b=>{
                b.pos[1]
            }) ){
                b.to[0]=0;
                b.to[1]=0;
            }
        })}) */
        /* else{
            b.pos[0] += b.to[0];  
            b.pos[1] += b.to[1]; 
        } */

        // рисуем его
        ctx.beginPath();
        ctx.arc(...b.pos, 5, 0, 2 * Math.PI);
     
        ctx.stroke();
    })

    // удаляем снаряды покинувшие канву
      bullets = bullets.filter(b =>{
        
        return b.pos[0] > 0 && b.pos[0] < canvas.width &&
               b.pos[1] > 0 && b.pos[1] < canvas.height
             
    })  
    count.textContent = bullets.length
        //qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
        requestAnimationFrame(drow)
}
function randomDiap(n,m) {
    return Math.floor(
      Math.random()*(m-n+1)
      )+n;
  }
 
render();
for(let i=0;i<level.rows;i++){
    if(i%2){
        console.log(level.tiles[i][level.columns-1]);   
        level.tiles[i].pop()
    }
 
}

console.log(level);
/* level.tiles.forEach(b=>{
    console.log(b);
     if(b[i]%2){
     console.log(b[level.columns-1].pop());   
    } 
}) */
