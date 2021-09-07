var game={
   spritests:{
    bubble:undefined
   },
   unit:function(){
    var cvs=document.getElementById("mycanvas");
    this.ctx=cvs.getContext("2d");

   },
   load:function(){
   this.spritests.bubble=new Image();
    this.spritests.bubble.src="bubble.png"
    
   
},
    //начало и запуск игры 
    start:function(){
       this.unit();
       this.load();
       this.render();

        
       this.run();
        
        console.log("привет!!!!");
       
    },
    // функция отвечающая за отрисовку всего холста и логику отрисовки спрайтов и тд
    render: function(){
        this.ctx.fillStyle="#6beeff";
        var cvs=document.getElementById("mycanvas");
        
        this.ctx.fillRect(0,0,cvs.width,cvs.height);
        this.ctx.drawImage(this.spritests.bubble,this.pullBubble.width*this.pullBubble.frame,0,this.pullBubble.width,this.pullBubble.height,this.pullBubble.x,this.pullBubble.y,this.pullBubble.width,this.pullBubble.height)
        this.ctx.strokeStyle='yellow';
       
        
        this.ctx.beginPath();
        this.ctx.lineWidth=this.pull.width;
        this.ctx.moveTo(this.pull.x,this.pull.y);
        this.ctx.lineTo(this.pull.newX,this.pull.newY);
        
        this.ctx.stroke();
        var cvs=document.getElementById("mycanvas");
        ctx=cvs.getContext("2d");
       
            ctx.drawImage(this.spritests.bubble,level.tilewidth*level.tiles.type,0,level.tilewidth,level.tileheight,level.tiles.tilex,level.tiles.tiley,level.tilewidth,level.tileheight)
            ctx.strokeStyle='yellow';
         
        
      
        
    },
    run: function(){
        this.render();
        window.requestAnimationFrame(function (){
            game.run();
        })
    },
   

};
window.addEventListener("load",function (){
    game.start();
})
//шарик которым стреляем по шарикам поля отрисовка +логика
game.pullBubble={
    x:300,
    y:320,
    frame:0,
    width:40,
    height:40
}
game.pull={
    x:320,
    y:340,
    width:3,
    height:50,
    newX:320,
    newY:290,
    update:function(){
        var cvs=document.getElementById("mycanvas");
       cvs.addEventListener("mousemove",function(ev){
          
         
        let angle=Math.atan2(game.pull.y-ev.y, ev.x - game.pull.x);
  
      
    
        newX=game.pull.x+game.pull.height*Math.cos(angle);
        newY=game.pull.y-game.pull.height*Math.sin(angle);
         game.pull.newX=newX;
        game.pull.newY=newY;
        cvs.addEventListener("click",(e)=>{
            game.pullBubble.frame=randomDiap(0,6);
            console.log(game.pullBubble.frame);
        })
     
        //var angleB = Math.atan2(ev.y - cyB, ev.x - cxB);
       // bullet.style.transform = "rotate(" + angleB + "rad)";
       /*  boxMove.style.transform = "rotate(" + angle + "rad)"; */
       })
       
    }

}

game.pull.update();




function randomDiap(n,m) {
  return Math.floor(
    Math.random()*(m-n+1)
    )+n;
}
level={
     columns:14,
     rows:14,
    tilewidth:40,
    tileheight:40,
    tiles:[],
}
for (var i=0; i<level.columns; i++) {
    level.tiles[i] = [];
    for (var j=0; j<level.rows; j++) {
        // Define a tile type and a shift parameter for animation
       
    }
}
function getTileCoordinate(column, row) {
    var tilex = column * level.tilewidth;
 
    // X offset for odd rows
    if (row % 2) {
        tilex += level.tilewidth/2;
    }
 
    var tiley = row * level.tileheight;
    return { tilex: tilex, tiley: tiley, type:randomDiap(0,6), }
}
function renderTiles() {
    // Top to bottom
    for (var j=0; j<level.rows; j++) {
        for (var i=0; i<level.columns; i++) {
            // Get the tile
         
            
            // Calculate the tile coordinates
            var coord = getTileCoordinate(i, j);
            level.tiles[j][i]=coord;
         console.log(level);
         
            // Draw the tile
           /*  drawTile(level.tiles[j][i].tilex,level.tiles[j][i].tiley, level.tiles[j][i].type); */
        }
    }
}
 renderTiles();
/*function drawTile(x, y, type){
    var cvs=document.getElementById("mycanvas");
    this.ctx=cvs.getContext("2d");
    this.ctx.fillStyle="#6beeff";
 
  
 
   
    

}
renderTiles(); */