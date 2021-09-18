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



/* if(w%2){
    if(b.pos[1]<=level.tiles[w][q].cord.tiley+tileheight&&b.pos[0]<=level.tiles[w][q].cord.tilex&&level.tiles[w][q].cord.tilex-tilewidth/2==0){
        b.to[0]=0;
        b.to[1]=0; 
        b.pos[1]=level.tiles[w][q].cord.tiley+tileheight;
        b.pos[0]=10; 
      
    }else if(b.pos[1]<=level.tiles[w][q].cord.tiley+tileheight&&b.pos[0]>=level.tiles[w][q].cord.tilex+tilewidth/2&&level.tiles[w][q].cord.tilex+tilewidth+tilewidth/2==canvas.offsetWidth){
        b.to[0]=0;
        b.to[1]=0; 
        b.pos[1]=level.tiles[w][q].cord.tiley+tileheight;
        b.pos[0]=canvas.offsetWidth-10; 
      
    }
    if(b.pos[1]<=level.tiles[w][q].cord.tiley+tileheight&&b.pos[0]>=level.tiles[w][q].cord.tilex&&b.pos[0]<=level.tiles[w][q].cord.tilex+tilewidth/2){
        b.to[0]=0;
        b.to[1]=0; 
        b.pos[1]=level.tiles[w][q].cord.tiley+tileheight;
        b.pos[0]=level.tiles[w][q].cord.tilex-tilewidth/2; 
       
        
    if(b.pos[1]<level.tiles[w][q].cord.tiley+tileheight&&b.pos[0]<level.tiles[w][q].cord.tilex-tilewidth/2){
        b.to[0]=0;
    b.to[1]=0; 
    b.pos[1]=level.tiles[w][q].cord.tiley+tileheight;
    if(b.pos[0]<canvas.offsetWidth/2){
        b.pos[0]=level.tiles[w][q].cord.tilex-tilewidth/2;  
    }else {b.pos[0]=level.tiles[w][q].cord.tilex+tilewidth/2;} 
    }else if(b.pos[1]<=level.tiles[w][q].cord.tiley+tileheight&&b.pos[0]>=level.tiles[w][q].cord.tilex+tilewidth/2&&b.pos[0]<=level.tiles[w][q].cord.tilex+tilewidth){
        b.to[0]=0;
        b.to[1]=0; 
        b.pos[1]=level.tiles[w][q].cord.tiley+tileheight;
        b.pos[0]=level.tiles[w][q].cord.tilex+tilewidth/2; 
      
    }
    
    
    
    
    
   

     level.tiles[5]=[];
    level.tiles[5][q]={cord:{tilex: b.pos[0], tiley: b.pos[1]},type:b.type}
    if(level.tiles[5][q].type==level.tiles[5-1][q].type){
        level.tiles[5].splice(q,1);
        level.tiles[5-1].splice(q,1);
        
    } 
}else{
    if(b.pos[1]<=level.tiles[w][q].cord.tiley+tileheight&&b.pos[0]>=level.tiles[w][q].cord.tilex&&b.pos[0]<=level.tiles[w][q].cord.tilex+tilewidth/2){
        b.to[0]=0;
        b.to[1]=0; 
        b.pos[1]=level.tiles[w][q].cord.tiley+tileheight;
        b.pos[0]=level.tiles[w][q].cord.tilex+tilewidth/2; 
     
    }else if(b.pos[1]<=level.tiles[w][q].cord.tiley+tileheight&&b.pos[0]>=level.tiles[w][q].cord.tilex+tilewidth/2&&b.pos[0]<=level.tiles[w][q].cord.tilex+tilewidth&&level.tiles[w][q].cord.tilex==canvas.offsetWidth-tilewidth){
        b.to[0]=0;
        b.to[1]=0; 
        b.pos[1]=level.tiles[w][q].cord.tiley+tileheight;
        b.pos[0]=level.tiles[w][q].cord.tilex-tilewidth/2; 
      
    }
} */
var type;
var typeS=0;
var typeNow=0;


   
function ff(){
    var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";

    // отдельно создаём набор POST-параметров запроса
    let sp = new URLSearchParams();
    let players=[];
    sp.append('f', 'INSERT');
    sp.append('n', 'BOGANOVBUBBLESHOOTER');
    sp.append('v', players);

    fetch(ajaxHandlerScript, { method: 'post', body: sp })
    .then( response => response.json() )
    .then( data => { console.log(data); } )
    .catch( error => { console.error(error); } );
}
function ff1(){
    var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";

    // отдельно создаём набор POST-параметров запроса
    let sp = new URLSearchParams();
    let players=[];
    sp.append('f', 'READ');
    sp.append('n', 'BOGANOVBUBBLESHOOTER');
   

 fetch(ajaxHandlerScript, { method: 'post', body: sp })
   .then( response => response.json() )
   .then( data => {console.log(data);wq(data)  }, )
   .catch( error => { console.error(error); } )
  

}
function ff3(){
    var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";

    // отдельно создаём набор POST-параметров запроса
    let sp = new URLSearchParams();
   
    sp.append('f', 'READ');
    sp.append('n', 'BOGANOVBUBBLESHOOTER');
   

 fetch(ajaxHandlerScript, { method: 'post', body: sp })
   .then( response => response.json() )
   .then( data => {console.log(data);qq(data)} )
   .catch( error => { console.error(error); } )
  

}


let players=JSON.stringify([]);
function ff2(uu){
    var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";

    // отдельно создаём набор POST-параметров запроса
    let sp = new URLSearchParams();
    
let tt=JSON.stringify(uu)
    sp.append('f', 'LOCKGET');
    sp.append('n', 'BOGANOVBUBBLESHOOTER');
    sp.append('p', 'BOGANOVBUBBLESHOOTER');
    let sp1 = new URLSearchParams();
    sp1.append('f', 'UPDATE');
    sp1.append('n', 'BOGANOVBUBBLESHOOTER');
    sp1.append('p', 'BOGANOVBUBBLESHOOTER');
    sp1.append('v',tt);

    fetch(ajaxHandlerScript, { method: 'post', body: sp })
    .then( response => response.json() )
    .then( data => { console.log(data); } )
    .catch( error => { console.error(error); } );
    
    fetch(ajaxHandlerScript, { method: 'post', body: sp1 })
    .then( response => response.json() )
    .then( data => { console.log(data); } )
    .catch( error => { console.error(error); } );
}

function qq(data){
    console.log(data);
     let uu=JSON.parse( data.result) 
     var player={name:"asdf",score:20}
    console.log(uu);
    uu.push(player);
    uu.sort((a, b) => b.score - a.score);
    
    ff2(uu); 
}
function wq(data){
    console.log(data);
     let wq=JSON.parse( data.result) 
     console.log(wq);
     wq.sort((a,b)=>b.score-a.score)
     console.log(wq);
}

function randomDiap(n,m) {
    return Math.floor(
      Math.random()*(m-n+1)
      )+n;
  }
  
/*let arr = [['1', '100'],['2', '99'] , ['3', '98'],['4', '97'] , ['5', '96']];

async function update(name, value) {
    let password = String(Math.random());

    let myHeaders = new Headers();
    myHeaders.append('Content-type', 'application/x-www-form-urlencoded');

    let urlencodedRecords = new URLSearchParams();
    urlencodedRecords.append('f', 'LOCKGET');
    urlencodedRecords.append('n', name);
    urlencodedRecords.append('p', password);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencodedRecords
    }
    console.log(value)
    let records = await fetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))

    console.log(records)

    let myHeadersUpdate = new Headers();
    myHeadersUpdate.append('Content-type', 'application/x-www-form-urlencoded');

    let urlencodedRecordsUpdate = new URLSearchParams();
    urlencodedRecordsUpdate.append('f', 'UPDATE');
    urlencodedRecordsUpdate.append('n', name);
    urlencodedRecordsUpdate.append('p', password);
    urlencodedRecordsUpdate.append('v', JSON.stringify(value));

    let requestOptionsUpdate = {
        method: 'POST',
        headers: myHeadersUpdate,
        body: urlencodedRecordsUpdate
    }

    fetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptionsUpdate)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error))
}

update('KLUBKOU_ZUMA_RECORDS',arr);*/
var animal = [{
    exemplar: "слон",
    quantity: 5
}, {
    exemplar: "коза",
    quantity: 1
}, {
    exemplar: "пингвин",
    quantity: 3
}];
animal.sort((a, b) => a.quantity < b.quantity);
for (var i = 0; i < animal.length; i++) {
    console.log(animal[i].exemplar, animal[i].quantity);
}