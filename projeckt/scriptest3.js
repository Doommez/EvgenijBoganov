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
       type:randomDiap(0,6), 
     });
  })
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
var  tileheight=40;
var tilewidth=40;
var rowheight=35;
var level={
    
    rows:canvas.offsetHeight/tilewidth/2+1,
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
    
 
     level.tiles.forEach(b=>{b.forEach(a=>{

        ctx.strokeStyle='red';
        ctx.beginPath();
       // ctx.strokeRect(a.cord.tilex,a.cord.tiley, tilewidth,tileheight)
       ctx.drawImage(bubble,tilewidth*a.type,0,tilewidth,tileheight,a.cord.tilex,a.cord.tiley,tilewidth,tileheight)
        ctx.stroke();
      
     })
    
       
    }) 
     //qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
     pullbubble()




     ctx.beginPath();
    ctx.arc(arcX, arcY, 22, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(arcX,arcY);
    ctx.lineTo(lineX,lineY);
    ctx.stroke();
   

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
    
        level.tiles[i].pop()
    }
 
}
function pullbubble(){
    bullets.forEach(b => {
        //сдвигаем снаряд на значение вектора 
      
        b.pos[0] += b.to[0]*0.09;  
        b.pos[1] += b.to[1]*0.09; 
        for(let w=level.tiles.length-1;w>0;w--){
            for(let q=0;q<level.tiles[w].length;q++){
             console.log();
             if(collis(b.pos[0],b.pos[1],20,level.tiles[w][q].cord.tilex,level.tiles[w][q].cord.tiley)){
                b.to[0]=0;
                b.to[1]=0; 
                b.pos[1]=level.tiles[w][q].cord.tiley+tileheight;
                b.pos[0]=level.tiles[w][q].cord.tilex-tileheight/2;
                
                return;
             }
              
            }}
       /*  for(let w=level.tiles.length-1;w>0;w--){
            for(let q=0;q<level.tiles[w].length;q++){

                 if(w%2){
                    if(b.pos[1]<level.tiles[w][q].cord.tiley+tileheight&&b.pos[0]<level.tiles[w][q].cord.tilex&&level.tiles[w][q].cord.tilex-b.pos[0]<40){
                        b.to[0]=0;
                    b.to[1]=0; 
                    b.pos[1]=level.tiles[w][q].cord.tiley+tileheight;
                    if(b.pos[0]<canvas.offsetWidth/2){
                        b.pos[0]=level.tiles[w][q].cord.tilex-tilewidth/2;  
                    }else b.pos[0]=level.tiles[w][q].cord.tilex+tilewidth/2;
                    }
                }else if(b.pos[1]<level.tiles[w][q].cord.tiley+tileheight&&b.pos[0]>level.tiles[w][q].cord.tilex&&b.pos[0]<level.tiles[w][q].cord.tilex+tilewidth){
                    b.to[0]=0;
                    b.to[1]=0;
                   
                    b.pos[1]=level.tiles[w][q].cord.tiley+tileheight;
                    
                    if(b.pos[0]<canvas.offsetWidth/2){
                        b.pos[0]=level.tiles[w][q].cord.tilex+tilewidth/2;  
                    }else b.pos[0]=level.tiles[w][q].cord.tilex-tilewidth/2;
               
        
                     level.tiles[5]=[];
                    level.tiles[5][q]={cord:{tilex: b.pos[0], tiley: b.pos[1]},type:b.type}
                    if(level.tiles[5][q].type==level.tiles[5-1][q].type){
                        level.tiles[5].splice(q,1);
                        level.tiles[5-1].splice(q,1);
                        
                    } 
                } 
              
            }
        } */
        if(b.pos[0]==1 ||b.pos[0]==canvas.width-1 ){
            b.to[0]=-b.to[0];
           
          
        }
        if(b.pos[1]<canvas.offsetTop+10){
            b.to[0]=0;
            b.to[1]=0;
        }
    
        // рисуем его
        ctx.beginPath();
        ctx.arc(...b.pos, 5, 0, 2 * Math.PI);
     
        ctx.stroke();
    })
}
function collis(x1,y1,r,x2,y2){
      // Calculate the distance between the centers
      var dx = x1 - x2;
      var dy = y1 - y2;
      var len = Math.sqrt(dx * dx + dy * dy);
   
      if (len < r + r) {
          // Circles intersect
          return true;
      }
   
      return false;
  }

console.log(level);

