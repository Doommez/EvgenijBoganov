var boxMove=document.getElementById("box__move"),
bullet=document.getElementById("bullet"),
container=document.getElementById("container");
var cBulletX=bullet.offsetLeft-bullet.offsetWidth/2;
var cBulletY=bullet.offsetTop-bullet.offsetHeight/2;
//позиция шара
var x;
var y;
pos()
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

document.addEventListener("mousemove",boxRot);
function boxRot(ev){
    var bb = boxMove.getBoundingClientRect();
   var bbb=bullet.getBoundingClientRect();
    var cx = bb.left + bb.width / 2, cy = bb.top + bb.height / 2;
    //let cxB=bbb.left + bbb.width / 2, cyB = bbb.top + bbb.height / 2;
    var angle = Math.atan2(ev.y - cy, ev.x - cx);
    //var angleB = Math.atan2(ev.y - cyB, ev.x - cxB);
   // bullet.style.transform = "rotate(" + angleB + "rad)";
    boxMove.style.transform = "rotate(" + angle + "rad)";
    
    document.addEventListener("click",shut);
    ballO.update();
    function shut(ev){
        console.log(ev.x);
        let q=(ev.x-cBulletX);
        let w=(ev.y-cBulletY);
      requestAnimationFrame(tt)
        function tt(){
            
           bulletO.posX=ev.x;
           bulletO.posY=ev.y;
           bulletO.update();
           requestAnimationFrame(tt)
        }
        }
    /*  document.addEventListener("click",shut);
    function shut(ev){
        bullet.style.top=ev.y+bullet.offsetHeight+20+"px";
        bullet.style.left=ev.x-bullet.offsetWidth/2+"px"
        } */
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
var bbb=bullet.getBoundingClientRect();
let ballO={
    posY:bbb.top+5,
  posX:bbb.left+5,  
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

 let timer3=requestAnimationFrame(nn);
function nn(){
    console.log(bbb.left);
    ballO.update();
    requestAnimationFrame(nn);
} 
ballO.update();