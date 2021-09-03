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
       document.addEventListener("mousemove",function(ev){
           var cx=game.pull.x, cy=game.pull.x;
           console.log(ev.x);
         let gipotinuza=Math.sqrt(Math.pow((ev.x-game.pull.x),2)+Math.pow((ev.y-game.pull.y),2)) ;
        console.log(gipotinuza);
        let angle=((ev.x-game.pull.x)/gipotinuza)*(180/Math.PI);
        console.log(angle);
        newX=gipotinuza*Math.cos(angle)+game.pull.x;
        newY=gipotinuza*Math.cos(90-angle)+game.pull.y;
         game.pull.newX=newX;
        game.pull.newY=newY;
     
        //var angleB = Math.atan2(ev.y - cyB, ev.x - cxB);
       // bullet.style.transform = "rotate(" + angleB + "rad)";
       /*  boxMove.style.transform = "rotate(" + angle + "rad)"; */
       })
       
    }

}

console.log(game.pull.update());