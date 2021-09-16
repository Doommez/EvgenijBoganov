canvas=document.getElementById("canvas");
ctx=canvas.getContext('2d');

var dropcluster=[];
var cluster=[];
var alpha=1;
var score=0;
var scoreNow=0;
var typeS=0;
var typeNow=randomDiap(0,6);
var floatingclusters = [];
var  dropFloatCluster=[];
/* var aud = new Audio('notification.mp3'); */



var bubble=new Image();
bubble.onload=drow;
bubble.src="bubble.png"
var gridpos;
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq

  var arcX  = 300;
  var arcY = 460;
  var lineX = 0;
  var lineY = 0;
  var arcXX  = 320;
  var arcYY = 480;
  
var count=document.getElementById("count")
  var bullets = [];  // массив снарядов
 

  
  canvas.addEventListener('mousemove', function (e) {
      
    let angle=Math.atan2(arcYY-e.y, e.x - arcXX);
  
      
    
    newX=arcXX+40*Math.cos(angle);
    newY=arcYY-40*Math.sin(angle);
    lineX=newX;
    lineY=newY;
  })

  canvas.addEventListener('click',pull) 
  function pull(e) {
    soundClick();
     let x = e.layerX - arcX;
     let y = e.layerY - arcY;
     let max = Math.max(Math.abs(x), Math.abs(y));
    let xx=x/max;
    let yy= y/max;
    
    
   
    
     // по клику добавляем информацию о  снаряде в массив  
     bullets.push({
       to: [xx,yy], // нормализованный вектор движения
       pos: [arcX,arcY], // положение
       type:typeNow, 
     });
     console.log(typeNow);
     typeS=randomDiap(0,6);
    typeNow= typeS;
    console.log(typeS);;
 
    }
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
var  tileheight=40;
var tilewidth=40;
var rowheight=35;
var level={
    
    rows:canvas.offsetHeight/tilewidth,
    columns:canvas.offsetWidth/tileheight,
    column:tileheight,
    row:tilewidth,
    tiles:[],
}

function render(){
    yy:for(let i=0;i<level.rows;i++){
        level.tiles[i]=[];
        for(let k=0;k<level.columns;k++){
            if(i<Math.floor(level.rows)/2){
            var cord= getcoordinate(k,i);
            var type=randomDiap(0,6)
            level.tiles[i][k]={cord,type};
           
              drow(k,i);  }
              if(i>=Math.floor(level.rows)/2){
                level.tiles[i][k]={cord,type:-1} 
              }
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
if(a==null)return
        ctx.strokeStyle='red';
        ctx.beginPath();
       // ctx.strokeRect(a.cord.tilex,a.cord.tiley, tilewidth,tileheight)
       /* ctx.drawImage(bubble,tilewidth*typeS,0,tilewidth,tileheight,0,315,tilewidth,tileheight) */
       ctx.drawImage(bubble,tilewidth*a.type,0,tilewidth,tileheight,a.cord.tilex,a.cord.tiley,tilewidth,tileheight)
        ctx.stroke();
      
     })
    
       
    }) 
     //qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
     pullbubble()




     ctx.beginPath();
     ctx.drawImage(bubble, tilewidth*typeS,0,tilewidth,tileheight,arcX,arcY,tilewidth,tileheight);
   
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(arcXX,arcYY);
    ctx.lineTo(lineX,lineY);
    ctx.stroke();
   

    // удаляем снаряды покинувшие канву
      bullets = bullets.filter(b =>{
        
        return b.pos[0] > 0 && b.pos[0] < canvas.width &&
               b.pos[1] > 0 && b.pos[1] < canvas.height
             
    })  
   /*  count.textContent = bullets.length */
        //qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
        if(dropcluster.length>0){
            for(let i=0;i<dropcluster.length;i++){
                ctx.save();
                ctx.globalAlpha=alpha;
                ctx.drawImage(bubble,tilewidth*dropcluster[i].type,0,tilewidth,tileheight,dropcluster[i].cord.tilex,dropcluster[i].cord.tiley,tilewidth,tileheight)
                ctx.fillStyle='red';
                ctx.font='italic bold 28px Arial';
               
                ctx.fillText("+"+scoreNow,dropcluster[1].cord.tilex,dropcluster[1].cord.tiley);
                ctx.restore();
            }
           
          
           
            
        }
  /*       updateScore() */
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
      
        b.pos[0] += b.to[0]*0.5;  
        b.pos[1] += b.to[1]*0.5; 

       if((level.tiles.length-1)*35+40>b.pos[1]){
        for(let w=level.tiles.length-1;w>=0;w--){
           

          
            for(let q=0;q<level.tiles[w].length;q++){
                
                if(level.tiles[w][q].type!=-1&&collis(b.pos[0],b.pos[1],20,level.tiles[w][q].cord.tilex,level.tiles[w][q].cord.tiley)){
                    b.to[0]=0;
                    b.to[1]=0; 
                    if(b.pos[0]-level.tiles[w][q].cord.tilex<0){
                         b.pos[1]=level.tiles[w][q].cord.tiley+35;
                    b.pos[0]=level.tiles[w][q].cord.tilex-tileheight/2;
                    }else if(b.pos[0]-level.tiles[w][q].cord.tilex>0){
                        b.pos[1]=level.tiles[w][q].cord.tiley+35;
                        b.pos[0]=level.tiles[w][q].cord.tilex+tileheight/2;
                    }
                    
                    var centerX=b.pos[0];
                   var centerY= b.pos[1];
                    gridpos = getGridPosition(centerX, centerY);
            
                   level.tiles[gridpos.y][gridpos.x]={cord:{tilex:b.pos[0],tiley:b.pos[1]},type:b.type}
                        bullets=[]
                        cluster = findCluster(gridpos.x,gridpos.y,  true, true, false);
                    
                        if (cluster.length >= 3) {
                            // Remove the cluster
                            soundClick1()
                            clusterDel(b.type);
                            //setGameState(gamestates.removecluster);
                            return;
                        } 
                }
           
            }  
        }
       }
     
        if(b.pos[0]<1 ||b.pos[0]>canvas.width-1 ){
 b.to[0]=-b.to[0];
                    } 
            
       
        if(b.pos[1]<canvas.offsetTop+10){
            b.to[0]=0;
            b.to[1]=0;
        }
       
        // рисуем его
        ctx.beginPath();
        ctx.drawImage(bubble,tilewidth*b.type,0,tilewidth,tileheight,b.pos[0],b.pos[1], tilewidth,tileheight);
      
     
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
function getGridPosition(x, y) {
    var gridy = Math.floor(y / rowheight);
 
    // Check for offset
    var xoffset = 0;
    if ((gridy) % 2) {
        xoffset = tilewidth / 2;
    }
    var gridx = Math.floor((x - xoffset) / tilewidth);
 
    return { x: gridx, y: gridy };
}

console.log(level);

function endGame(){
    for(let n=0;n<level.columns;n++){
        if(level.tiles[level.rows-1].length==0){
            return false
        }else if(level.tiles[level.rows-1].length>0) {
            alert("asdf");
            render();
            return true
    }
    
}}
function findCluster(ty, tx, matchtype, reset, skipremoved) {
    // Reset the processed flags
    if (reset) {
        resetProcessed();
    }
    
    // Get the target tile. Tile coord must be valid.
    var targettile = level.tiles[tx][ty];
    
    // Initialize the toprocess array with the specified tile
    var toprocess = [targettile];
    targettile.processed = true;
    var foundcluster = [];

    while (toprocess.length > 0) {
        // Pop the last element from the array
        var currenttile = toprocess.pop();
        
        // Skip processed and empty tiles
        if (currenttile.type == -1) {
            continue;
        }
        
        // Skip tiles with the removed flag
        if (skipremoved && currenttile.removed) {
            continue;
        }
        
        // Check if current tile has the right type, if matchtype is true
        if (!matchtype || (currenttile.type == targettile.type)) {
            // Add current tile to the cluster
            foundcluster.push(currenttile);
            
            // Get the neighbors of the current tile
            var neighbors = getNeighbors(currenttile);
            
            // Check the type of each neighbor
             for (var i=0; i<neighbors.length; i++) {
                if (!neighbors[i].processed) {
                    // Add the neighbor to the toprocess array
                    toprocess.push(neighbors[i]);
                    neighbors[i].processed = true;
                }
            } 
        }
    }
    
    // Return the found cluster
    return foundcluster;
}
function resetProcessed() {
    for (var i=0; i<level.rows; i++) {
        for (var j=0; j<level.tiles[i].length; j++) {
         
            level.tiles[i][j].processed = false;
        }
    }
}
 
// Neighbor offset table
var neighborsoffsets = [[[1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]], // Even row tiles
                        [[1, 0], [1, 1], [0, 1], [-1, 0], [0, -1], [1, -1]]];  // Odd row tiles
 
// Get the neighbors of the specified tile
function getNeighbors(tile) {
    var tilerow = (tile.cord.tiley/35) % 2; // Even or odd row
    var neighbors = [];
 
    // Get the neighbor offsets for the specified tile
    var n = neighborsoffsets[tilerow];
 
    // Get the neighbors
    for (var i=0; i<n.length; i++) {
        // Neighbor coordinate
        var nx = tile.cord.tilex/40 + n[i][0];
        var ny = tile.cord.tiley/35 + n[i][1];
 
        // Make sure the tile is valid
        if (nx >= 0 && nx < level.columns && ny >= 0 && ny < level.rows) {
            var nxx=Math.floor(nx);
           if(level.tiles[ny][nxx]!=undefined){
                 neighbors.push(level.tiles[ny][nxx]);
           }
          
           
        
        }
    }
 
    return neighbors;
}
function clusterDel(){
    
     dropcluster=JSON.parse(JSON.stringify(cluster))
    console.log(dropcluster);
    scoreNow=dropcluster.length*100;
    score+=dropcluster.length*100
    function removeBuble(){  
        requestAnimationFrame(removeBuble)
        for(let y=0;y<dropcluster.length;y++){
            let speedRemove=1;
            tile=dropcluster[y].cord;
            tile.tiley+=speedRemove;
            alpha+=-0.01;
         

         
        
floatingclusters = findFloatingClusters();
for(let v=0;v<floatingclusters.length;v++)
{
    floatingclusters[v][0].type=-1
    
 
}
score+=floatingclusters.length*100
/*    dropFloatCluster=JSON.parse(JSON.stringify( floatingclusters));
   for(let g=0;g<dropFloatCluster.length;g++){
    dropFloatCluster[g].cord.tiley+=speedRemove;
    
 
} */
          
            if(alpha<0){
                alpha=0;

            }
            
            console.log(alpha);
          if(tile.tiley>250){
              cancelAnimationFrame(removeBuble)
              dropcluster=[];
              speedRemove=1;
              alpha=1
              scoreNow=0
          }
          



       }
    }
   requestAnimationFrame(removeBuble)

  
    for (var i=0; i<cluster.length; i++) {
        // Set the removed flag
        cluster[i].removed = true;
        cluster[i].type=-1
        floatingclusters
    }
   

}
function findFloatingClusters() {
    // Reset the processed flags
    resetProcessed();
 
    var foundclusters = [];
 
    // Check all tiles
    for (var i=0; i<level.rows; i++) {
        for (var j=0; j<level.tiles[i].length; j++) {
            var tile = level.tiles[i][j];
         
            if (!tile.processed) {
                // Find all attached tiles
                var foundcluster = findCluster(j,i, false, false, true);
 
                // There must be a tile in the cluster
                if (foundcluster.length <= 0) {
                    continue;
                }
 
                // Check if the cluster is floating
                var floating = true;
                for (var k=0; k<foundcluster.length; k++) {
                    if (foundcluster[k].cord.tiley == 0) {
                        // Tile is attached to the roof
                        floating = false;
                        break;
                    }
                }
 
                if (floating) {
                    // Found a floating cluster
                    foundclusters.push(foundcluster);
                }
            }
        }
    }
 
    return foundclusters;
}
function updateScore(){
    let divsc=document.getElementById("score");
    divsc.textContent=""
    var scroreText=document.createTextNode(score);
    divsc.appendChild(scroreText)
}
function soundClick() {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'audiomass-output.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }

  function soundClick1() {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'cbc4277e031bf4a.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }