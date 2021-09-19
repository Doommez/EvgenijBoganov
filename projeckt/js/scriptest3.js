let player={
    name:"",
    score:0
  }
  var textChanged=false;
  
window.onhashchange=switchToStateFromURLHash;

// текущее состояние приложения
// это Model из MVC
var SPAState={}; // могут быть элементы pagename и photoid



// вызывается при изменении закладки УРЛа
// а также при первом открытии страницы
// читает новое состояние приложения из закладки УРЛа
// и обновляет ВСЮ вариабельную часть веб-страницы
// соответственно этому состоянию
// это упрощённая реализация РОУТИНГА - автоматического выполнения нужных
// частей кода в зависимости от формы URLа
// "роутинг" и есть "контроллер" из MVC - управление приложением через URL
function switchToStateFromURLHash() {
  var URLHash=window.location.hash;

  // убираем из закладки УРЛа решётку
  // (по-хорошему надо ещё убирать восклицательный знак, если есть)
  // и декодируем из формата УРЛ, т.к. любые значения в УРЛ закодированы
  var stateJSON=decodeURIComponent(URLHash.substr(1));

  if ( stateJSON!="" )
    SPAState=JSON.parse(stateJSON); // если JSON непустой, читаем из него состояние и отображаем
  else{
      SPAState={pagename:'Main'};
      
  }
    // иначе показываем главную страницу

 
  console.log(SPAState);

  // обновляем вариабельную часть страницы под текущее состояние
  // это реализация View из MVC - отображение состояния модели в HTML-код
  var pageHTML="";
  switch ( SPAState.pagename ) {
    case 'Main':
        canvas.style.visibility="hidden"
      pageHTML+=`<button class='bts  pos4' id='Start' onclick='start()'>Start Game</button>`;
      pageHTML+=`<button class='bts  pos5' id='ruless' onclick='rules()'>Rules</button>`;
      pageHTML+=`<img src="img/unnamed.png" alt="logo" id="logo"></img>`;
      break;
    case 'game':
      
      pageHTML+=`<button class="bts2 pos0" onclick="tttUpdate()">NEW GAME</button>
      <button class="bts2 pos1" onclick="ff1()">RECORDS</button>
      <button class="bts2 pos3" onclick="soundClick2()">  MUSIC</button>`;
      canvas.style.visibility="visible"
      break;
    case 'About':
      pageHTML+="<h3>О нас</h3>";
      pageHTML+="<p>Мы круты!</p>";
      break;
  }
  document.getElementById('IPage').innerHTML=pageHTML;
}

// устанавливает в закладке УРЛа новое состояние приложения
// и затем устанавливает+отображает это состояние
function switchToState(newState) {
  
  // устанавливаем закладку УРЛа (кодируя как положено любые компоненты УРЛ)
  // нужно для правильной работы кнопок навигации браузера
  // (т.к. записывается новый элемент истории просмотренных страниц)
  // и для возможности передачи УРЛа другим лицам
  location.hash=encodeURIComponent(JSON.stringify(newState));
  /* if(newState=={pagename:"Main"}){
      canvas.style.visibility="hidden"
  }
  canvas.style.visibility="visible" */

  // АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
  // т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
}

function switchToMainPage() {
  switchToState( { pagename:'Main' } );
  
}

function switchToGamePage() {
  switchToState( { pagename:'game'});
  player.name=document.getElementById("name").value;
  document.getElementById("player").style.top="-200%"
 
}
document.addEventListener("click",txtChanged)
window.onbeforeunload=befUnload;

  function befUnload(EO) {
    EO=EO||window.event;
    // если текст изменён, попросим браузер задать вопрос пользователю
    if ( textChanged )
      EO.returnValue='А у вас есть несохранённые изменения!';
  };
function txtChanged(EO) {
    EO=EO||window.event;

    textChanged=true; // текст изменён
  }
 

function switchToAboutPage() {
  switchToState( { pagename:'About' } );
}

// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
switchToStateFromURLHash();

function start(){
  document.getElementById("Start").style.display="none";
  document.getElementById("ruless").style.display="none";
  document.getElementById("rules").style.display="none";
  document.getElementById("logo").style.display="none"
  document.getElementById("player").style.top='40%';
  if(res){
    document.getElementById("player").style.left='35%';
  }
  document.getElementById("player").style.left='40%';
}
let rulsPos=-100;

function rules(){
    if(rulsPos==-100){
        document.getElementById("rules").style.top='10%';
        rulsPos=10
    }else{
        document.getElementById("rules").style.top='-200%';
        rulsPos=-100
    }
    
    
  }
  let res=false;
  let windowsSize;
  
 window.onload=function wins(){
    windowsSize = window.innerWidth;
    console.log(windowsSize);
    resize();
  }
   window.addEventListener("resize",resize)
  function resize(){
      console.log();
     if(window.innerWidth<620||windowsSize<620){
       
        canvas.style.width=370+"px"
        canvas.style.marginTop=50+"px"
        canvas.style.height=400+"px";
         res=true;
         document.getElementById("player").style.left='30%';
     }else if(window.innerWidth>620||windowsSize>620){
         canvas.style.width=600+"px"
        canvas.style.height=500+"px"; 
        canvas.style.marginTop=0+"px"
        res=false
        //canvas.width=600
       // canvas.height=500;
     }
  }
 


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
var sqip=0;
var sqipNone=false;
/* var aud = new Audio('notification.mp3'); */
let newRow=[];


var bubble=new Image();
bubble.onload=drow;
bubble.src="img/bubble.png"

var logo=new Image();
logo.onload=drow;
logo.src="img/logo.png"

var gridpos;
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq

  var arcX  = canvas.offsetWidth/2;
  var arcY = canvas.offsetHeight-40;
  var lineX = 0;
  var lineY = 0;
  var arcXX  = 320;
  var arcYY = 480;
  
var count=document.getElementById("count")
  var bullets = [];  // массив снарядов
 

  let ex;
  let ey
  canvas.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    let angle=Math.atan2(arcYY-e.y, e.x - arcXX);
   ex= Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width) 
  ey=Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
    newX=arcXX+40*Math.cos(angle);
    newY=arcYY-40*Math.sin(angle);
    lineX=newX;
    lineY=newY;
  })

  canvas.addEventListener('click',pull) 
  function pull(e) {
      console.log(sqip);
      if(sqip>=10){
      /*   let vv=0;
       if(level.tiles[0].length==level.columns){
           vv=level.columns-1
       }else{
            vv=level.columns;
       }
        for(let i=0;i<vv;i++){
            console.log("qwerqwerqwerqwerqwerqwer");
            let cord={tilex:i*40,tiley:0}
            let type=randomDiap(0,6)
            let newColom={cord:cord,type:type}
             newRow.push(newColom);
             
          
           }
           
         level.tiles.reverse().push(newRow) */
         let vv=0;
         for (var i=0; i<level.rows-3; i++) {
            
   
            for (var j=0; j<level.columns; j++) {
                level.tiles[level.rows-1-i][j].type = level.tiles[level.rows-1-i-2][j].type;
 
            }
            
        }
         for(var p=0; p<level.columns; p++){
            level.tiles[0][p].type=randomDiap(0,6);
            level.tiles[1][p].type=randomDiap(0,6);
          
         } 
       
        sqip=0
      }
     
    soundClick();
console.log(e.layerX);
    typeNow= typeS;
     let x = ex - arcX;
     let y = ey - arcY;
     let max = Math.max(Math.abs(x), Math.abs(y));
    let xx=x/max;
   let yy= y/max;
    
    
   
    
     // по клику добавляем информацию о  снаряде в массив  
     bullets.push({
       to: [xx,yy], // нормализованный вектор движения
       pos: [arcX,arcY], // положение
       type:typeNow, 
     });
     
     typeS=randomDiap(0,6);
     if(sqipNone==false){
        sqip+=1
     }
    sqipNone=false;
    
    }
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
var  tileheight=40;
var tilewidth=40;
var rowheight=35;
var level={
    
    rows:Math.floor(canvas.offsetHeight/tilewidth) ,
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
                var cord= getcoordinate(k,i);
              
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
    
    ctx.strokeStyle='red';
    ctx.beginPath();
    ctx.moveTo(0,385);
    ctx.lineTo(600,385);
    ctx.stroke();
     level.tiles.forEach(b=>{b.forEach(a=>{
if(a==null)return

       // ctx.strokeRect(a.cord.tilex,a.cord.tiley, tilewidth,tileheight)
       /* ctx.drawImage(bubble,tilewidth*typeS,0,tilewidth,tileheight,0,315,tilewidth,tileheight) */
       ctx.drawImage(bubble,tilewidth*a.type,0,tilewidth,tileheight,a.cord.tilex,a.cord.tiley,tilewidth,tileheight)
        
      
     })
    
       
    }) 
     //qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
     pullbubble()




     ctx.beginPath();
     ctx.drawImage(bubble, tilewidth*typeS,0,tilewidth,tileheight,arcX,arcY,tilewidth,tileheight);
   
    ctx.stroke();

    /* ctx.beginPath();
    ctx.moveTo(arcXX,arcYY);
    ctx.lineTo(lineX,lineY);
    ctx.stroke();
    */

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
        if(res){
            ctx.drawImage(logo,30,canvas.offsetHeight-35,126,60)       
            ctx.fillStyle='red';
            ctx.font='italic bold 20px Arial';
            ctx.fillText('your score',40,canvas.offsetHeight-30);
        
            ctx.strokeStyle='blue';
            ctx.lineWidth=2;
            ctx.font='normal 25px Arial';
            ctx.strokeText(score,70,canvas.offsetHeight-20);
        }else{ 
            ctx.drawImage(logo,30,canvas.offsetHeight-85,126,60)       
            ctx.fillStyle='red';
            ctx.font='italic bold 20px Arial';
            ctx.fillText('your score',40,canvas.offsetHeight-60);
        
            ctx.strokeStyle='blue';
            ctx.lineWidth=2;
            ctx.font='normal 25px Arial';
            ctx.strokeText(score,70,canvas.offsetHeight-35);
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
    
        level.tiles[i][level.columns-1].type=-1
    }
 
}
function pullbubble(){
    bullets.forEach(b => {
        //сдвигаем снаряд на значение вектора 
      
        b.pos[0] += b.to[0]*0.35;  
        b.pos[1] += b.to[1]*0.35; 

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
                            sqipNone=true;
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
        endGame();
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
        if(level.tiles[level.rows-1][n].type!=-1){
            player.score=score;

       
            DD() 
        }
    
}
function DD(){
    alert("GAME OVER")
    tttUpdate()
}

}
function tttUpdate(){
    ff3()
    score=0
    sqip=0
    for(let i=0;i<level.rows;i++){
        
        for(let k=0;k<level.columns;k++){
            if(i<Math.floor(level.rows)/2){
           
              
             
            level.tiles[i][k].type=randomDiap(0,6);
            if(i%2){
    
                level.tiles[i][level.columns-1].type=-1
            }
               }
              if(i>=Math.floor(level.rows)/2){
              
              
                level.tiles[i][k].type=-1 
              }
        }
    }
}
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
          if(tile.tiley>280){
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

function soundClick() {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'music/audiomass-output.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }

  function soundClick1() {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'music/cbc4277e031bf4a.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }
  let bg = document.querySelector('.mouse-parallax-bg');
/*   window.addEventListener('mousemove', function(e) {
      let x = e.clientX / window.innerWidth;
      let y = e.clientY / window.innerHeight;  
      bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
  }); */
  
  let audio = document.querySelector('.musicOn audio');
  
  function soundClick2() {
    audio.paused ? audio.play() : audio.pause();
  }
 
  // в закладке УРЛа будем хранить полное JSON-представление состояния приложения

  // отслеживаем изменение закладки в УРЛе
  // оно происходит при любом виде навигации
  // (в т.ч. при нажатии кнопок браузера ВПЕРЁД/НАЗАД)
  // и при программном изменении закладки
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
     
    console.log(uu);
    uu.push(player);
    uu.sort((a, b) => b.score - a.score);
    
    ff2(uu); 
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
function ff1(){
    var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";

    // отдельно создаём набор POST-параметров запроса
    let sp = new URLSearchParams();
    
    sp.append('f', 'READ');
    sp.append('n', 'BOGANOVBUBBLESHOOTER');
   

 fetch(ajaxHandlerScript, { method: 'post', body: sp })
   .then( response => response.json() )
   .then( data => {console.log(data);wq(data)  }, )
   .catch( error => { console.error(error); } )
  

}
let records=document.getElementById("records");
let recordsName=document.getElementById("recordsName");
let recordsScores=document.getElementById("recordsScores");
let prs=-100;
let recHtmlName="";
let recHtmlScores="";
function wq(data){
    console.log(data);
     let wq=JSON.parse( data.result) 
     
     wq.sort((a,b)=>b.score-a.score);
     wq.length=5
     for(let i=0;i<wq.length;i++){
         wq[i].name.slice(11,wq[i].name.length-11)
     }
     recHtmlName=`<div class="recordsWiu">1.${wq[0].name}</div>
     <div class="recordsWiu">2.${wq[1].name}</div>
     <div class="recordsWiu">3.${wq[2].name}</div>
     <div class="recordsWiu">4.${wq[3].name}</div>
     <div class="recordsWiu">5.${wq[4].name}</div>`
     recHtmlScores=`<div class="recordsWiu">${wq[0].score}</div>
     <div class="recordsWiu">${wq[1].score}</div>
     <div class="recordsWiu">${wq[2].score}</div>
     <div class="recordsWiu">${wq[3].score}</div>
     <div class="recordsWiu">${wq[4].score}</div>`
     recordsName.innerHTML=recHtmlName;
     recordsScores.innerHTML=recHtmlScores;
     if(prs==20){
        records.style.top=prs+"%" 
       
     prs=-100
     
     } else{
        records.style.top=prs+"%";
        prs=20;
     } 
    
}

console.log(records);