var boxMove=document.getElementById("box__move"),
bullet=document.getElementById("bullet"),
container=document.getElementById("container");
var cBulletX=bullet.offsetLeft-bullet.offsetWidth/2;
var cBulletY=bullet.offsetTop-bullet.offsetHeight/2;
console.log(container);
document.addEventListener("mousemove",boxRot);
function boxRot(ev){
    var bb = boxMove.getBoundingClientRect();
    var cx = bb.left + bb.width / 2, cy = bb.top + bb.height / 2;
    var angle = Math.atan2(ev.y - cy, ev.x - cx);
    
    boxMove.style.transform = "rotate(" + angle + "rad)";
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

