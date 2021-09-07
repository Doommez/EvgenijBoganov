var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var arcX  = 320;
  var arcY = 338;
  var lineX = 0;
  var lineY = 0;
  var speed = 10;
  var vector = {top: false, bottom: false, left: false, right: false}
  var KEY_COD = {w: 87, d: 68,s: 83, a: 65};
var count=document.getElementById("count")
  var bullets = [];  // массив снарядов
 
  function keyDownHandler (e) {
    if (KEY_COD.w == e.keyCode) vector.top = true;
    if (KEY_COD.d == e.keyCode) vector.left = true;
    if (KEY_COD.s == e.keyCode) vector.bottom = true;
    if (KEY_COD.a == e.keyCode) vector.right = true;
  };

  function keyUpHandler (e) {
    if (KEY_COD.w == e.keyCode) vector.top = false;
    if (KEY_COD.d == e.keyCode) vector.left = false;
    if (KEY_COD.s == e.keyCode) vector.bottom = false;
    if (KEY_COD.a == e.keyCode) vector.right = false;
  }

  document.addEventListener('keydown', keyDownHandler)
  document.addEventListener('keyup', keyUpHandler)
  
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
     });
  })

  function draw () {
    if (vector.top && arcY >= 50 + speed)  arcY -= speed;
    if (vector.left && arcX < canvas.width - 50) arcX += speed;
    if (vector.bottom && arcY < canvas.height - 50) arcY += speed;
    if (vector.right && arcX >= 50 + speed) arcX -= speed;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(arcX, arcY, 22, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(arcX,arcY);
    ctx.lineTo(lineX,lineY);
    ctx.stroke();

    bullets.forEach(b => {
        //сдвигаем снаряд на значение вектора 
        b.pos[0] += b.to[0];  
        b.pos[1] += b.to[1]; 
        if(b.pos[0]==10 ||b.pos[0]==canvas.width-10 ){
            b.to[0]=-b.to[0];
           
          
        }
        if(b.pos[1]<canvas.offsetTop+10){
            b.to[0]=0;
            b.to[1]=0;
        }
        /* else{
            b.pos[0] += b.to[0];  
            b.pos[1] += b.to[1]; 
        } */

        // рисуем его
        ctx.beginPath();
        ctx.arc(...b.pos, 5, 0, 2 * Math.PI);
     
        ctx.stroke();
    })

    // удаляем снаряды покинувшие канву
      bullets = bullets.filter(b =>{
        
        return b.pos[0] > 0 && b.pos[0] < canvas.width &&
               b.pos[1] > 0 && b.pos[1] < canvas.height
             
    })  
    count.textContent = bullets.length
    // для отладки - подсчет снарядов
   
  }

  setInterval(draw, 10)





/*   var ctx = canvas.getContext("2d");
var arcX = 100, arcY = 100, lineX = 0, lineY = 0, 
    r = 25, br = 5, bullets = [];

 

canvas.addEventListener('mousemove',  e => {
   lineX = e.layerX, lineY = e.layerY;
})

canvas.addEventListener('click',  e => {
   let x = e.layerX - arcX, y = e.layerY - arcY;
   let max = Math.max(Math.abs(x), Math.abs(y));
   
   // по клику добавляем информацию о  снаряде в массив  
   bullets.push({
     to: [x/max, y/max], // нормализованный вектор движения
     pos: [arcX, arcY], // положение 
     explode: 0
   });
})

draw(); // тут только рисуем
setInterval(tick, 10); // обсчитываем положения с фиксированным шагом

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(arcX, arcY, r-2, 0, 2 * Math.PI);
  ctx.stroke();

  let x = lineX - arcX, y = lineY - arcY;
  let a = Math.atan2(y,x);

  ctx.beginPath();
  ctx.moveTo(arcX,arcY);
  ctx.lineTo(arcX+Math.cos(a)*r*1.3, arcY+Math.sin(a)*r*1.3);
  ctx.stroke();

  bullets.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.pos[0], b.pos[1], br, 0, 2 * Math.PI);
      b.explode ? ctx.fill() : ctx.stroke();
  })

  // для отладки - подсчет снарядов
  count.textContent = bullets.length

  // это откладывает вызов функции `draw` до следующего момента, 
  //когда браузер будет готов нарисовать следующий кадр
  requestAnimationFrame(draw) 
}

function tick () {

  
  bullets.filter(b => b.explode === 0).forEach(b => {
      //сдвигаем снаряд на значение вектора 
      b.pos[0] += b.to[0];  
      b.pos[1] += b.to[1]; 
  })

  bullets.forEach((b1, i) => {
      
    if (b1.explode) 
      b1.explode += 0.1;
      
    for (var j=i+1; j<bullets.length; j++) {
      let b2 = bullets[j];
      let dx = b2.pos[0] - b1.pos[0]; 
      let dy = b2.pos[1] - b1.pos[1];
      if (dx*dx+dy*dy<100)
        b1.explode = b2.explode = 1;
    }
      
    if(b1.pos[0] < br || b1.pos[0] > canvas.width-br ||
       b1.pos[1] < br || b1.pos[1] > canvas.height-br)  
        b1.explode = 1;
  })

} */