var boxMove=document.getElementById("box__move"),
bullet=document.getElementById("bullet"),
container=document.getElementById("container");
var cBulletX=bullet.offsetLeft-bullet.offsetWidth/2;
var cBulletY=bullet.offsetTop-bullet.offsetHeight/2;
var cBulletX=bullet.offsetLeft-bullet.offsetWidth/2;
var cBulletY=bullet.offsetTop-bullet.offsetHeight/2;
//позиция шара
var x;
var y;

pos();
function pos( ) {

   

    
    var radius=80;
    var angle=90/180*Math.PI;

    var boxMoveCenterX=boxMove.offsetLeft+boxMove.offsetWidth/2;
    var boxMoveCenterY=boxMove.offsetTop+boxMove.offsetHeight/2;

     x=boxMoveCenterX+radius*Math.sin(angle);
   y=boxMoveCenterY-radius*Math.cos(angle);
   console.log(x,y);
return x,y;

   /*  green.style.left=Math.round(greenCenterX-green.offsetWidth/2)+'px';
    green.style.top=Math.round(greenCenterY-green.offsetHeight/2)+'px'; */
}

console.log(container);
var timer;
var bbb
document.addEventListener("mousemove",boxRot);
function boxRot(ev){
    var bb = boxMove.getBoundingClientRect();
    bbb=bullet.getBoundingClientRect();
    var cx = bb.left + bb.width / 2, cy = bb.top + bb.height / 2;
    //let cxB=bbb.left + bbb.width / 2, cyB = bbb.top + bbb.height / 2;
    var angle = Math.atan2(ev.y - cy, ev.x - cx);
    //var angleB = Math.atan2(ev.y - cyB, ev.x - cxB);
   // bullet.style.transform = "rotate(" + angleB + "rad)";
    boxMove.style.transform = "rotate(" + angle + "rad)";
    ballO.update();
    
    document.addEventListener("click",shut);
   
    function shut(ev){
        console.log(ev.x);
        let q=(ev.x-ball.offsetLeft-ball.offsetWidth/2)/300;
        let w=(ev.y-ball.offsetTop-ball.offsetHeight/2)/300;
      requestAnimationFrame(tt)
        function tt(){
            if(ballO.posX<container.offsetLeft||ballO.posX>container.offsetWidth||ballO.posY>container.offsetHeight||ballO.posY<container.offsetTop){
                return
            }
            ballO.posX+=q;
            ballO.posY+=w;
            ballO.update();
           console.log( container.offsetWidth);
            console.log(ball.posX);
            
           requestAnimationFrame(tt)
        }
        }
  document.addEventListener("click",shut);
    function shut(ev){
        bullet.style.top=ev.y+bullet.offsetHeight+20+"px";
        bullet.style.left=ev.x-bullet.offsetWidth/2+"px"
        } 
}
let areaH=[
    [0,0]
];
for(let i=0;i<areaH.length;i++){
    for(let k=0;k<areaH[i].length;k++){
        if(areaH[i][k]==0){
            creatPole0();
        }
         
           
        
    }

}
function creatPole0(){
    let div=document.createElement("div");
    div.className="pole0";
    document.body.appendChild(div)

}

//летит шар
let bulletO={
      posY:40,
    posX:80,  
     /* posY:0,
    posX:80,  */
        speedX :2 ,
        speedY : 1,
        width : 20,
        height: 20,
        update: function(){
        bullet.style.left=this.posX+"px";
        bullet.style.top=this.posY+"px";
        }
}
bulletO.update();
var ball=document.getElementById("ball");

var posXNN,posYNN

let ballO={
    posY:bullet.getBoundingClientRect().top,
  posX:bullet.getBoundingClientRect().left,  
   /* posY:0,
  posX:80,  */
      speedX :2 ,
      speedY : 1,
      width : 20,
      height: 20,
      update: function(){
        ball.style.left=this.posX+"px";
        ball.style.top=this.posY+"px";
      
      }
     
}
ballO.update();
 let timer3=requestAnimationFrame(nn);
function nn(){
    let bbbb=bullet.getBoundingClientRect();
 
     ball.style.left=bbbb.left+bbbb.width/2-ball.offsetWidth/2+"px";
    ball.style.top=bbbb.top+bbbb.height/2-ball.offsetHeight/2+"px";  
     requestAnimationFrame(nn);

} 
var area=[
    [1,1,1,1,1,1,1,1,1,1],
    [2,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [2,1,1,1,1,1,1,1,1,0]
]
let areaf= document.createElement("div");
areaf.setAttribute("id","area");
document.body.appendChild(areaf);
let areaD=document.getElementById("area")
function drow(){
    let countForBuble=area.length
  
    for(let i=0;i<area.length;i++){
        if(area[i][0]==2){
            creatOTS(i);
         }
        for(let k=0;k<area[i].length;k++){
            if(area[i][k]==0){
                creatPole00(k,i);
            }
            if(area[i][k]==1){
                
                creatPole01(k,i);
            }
            
        }
        
    }
    
}
function creatPole00(k,i){
    let div=document.createElement("div");
    div.className="pole0";
    div.setAttribute("id",k+i)
    areaD.appendChild(div)
}
function creatPole01(k,i){
    let div=document.createElement("div");
    div.className="pole1";
    div.setAttribute("id",k)
    areaD.appendChild(div)
}
function creatOTS(i){
    let div=document.createElement("div");
    div.className="polepol";
    areaD.appendChild(div)
}
drow();
areaD.addEventListener("click",function(e){
console.log(e.x,e.y);
let l=document.elementFromPoint(e.x,e.y);
console.log(l);
})