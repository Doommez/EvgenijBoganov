canvas=document.getElementById("canvas");
ctx=canvas.getContext('2d');

var cluster=[];
var bubble=new Image();
bubble.onload=drow;
bubble.src="bubble.png"
var gridpos;
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
            if(i>4)continue yy
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
   /*  count.textContent = bullets.length */
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
      
        b.pos[0] += b.to[0]*0.5;  
        b.pos[1] += b.to[1]*0.5; 

       if((level.tiles.length-1)*35+40>b.pos[1]){
        for(let w=level.tiles.length-1;w>=0;w--){
           

          
            for(let q=0;q<level.tiles[w].length;q++){
                
                if(collis(b.pos[0],b.pos[1],20,level.tiles[w][q].cord.tilex,level.tiles[w][q].cord.tiley)){
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
                        
                   level.tiles[gridpos.y][gridpos.x]={cord:{tilex:b.pos[0],tiley:b.pos[1]},type:0}
                        bullets=[]
                        cluster = findCluster(gridpos.x,gridpos.y,  level.tiles[gridpos.y][gridpos.x].type, true, false);
                                   
                        if (cluster.length >= 3) {
                            // Remove the cluster
                            setGameState(gamestates.removecluster);
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
        endGame();
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
 
    
    // Get the target tile. Tile coord must be valid.
    var targettile = level.tiles[tx][ty];
    
    // Initialize the toprocess array with the specified tile
    var toprocess = [targettile];
   
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
    for (var i=0; i<level.columns; i++) {
        for (var j=0; j<level.rows; j++) {
            level.tiles[i][j].processed = false;
        }
    }
}
 
// Neighbor offset table
var neighborsoffsets = [[[1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]], // Even row tiles
                        [[1, 0], [1, 1], [0, 1], [-1, 0], [0, -1], [1, -1]]];  // Odd row tiles
 
// Get the neighbors of the specified tile
function getNeighbors(tile) {
    var tilerow = (tile.cord.tiley) % 2; // Even or odd row
    var neighbors = [];
 
    // Get the neighbor offsets for the specified tile
    var n = neighborsoffsets[tilerow];
 
    // Get the neighbors
    for (var i=0; i<n.length; i++) {
        // Neighbor coordinate
        var nx = tile.cord.tilex/40 + n[i][0];
        var ny = tile.cord.tiley/40 + n[i][1];
 
        // Make sure the tile is valid
        if (nx >= 0 && nx < level.columns && ny >= 0 && ny < level.rows) {
            var nxx=Math.floor(nx);
            var nyy=Math.floor(ny);
            neighbors.push(level.tiles[nyy][nxx]);
        }
    }
 
    return neighbors;
}