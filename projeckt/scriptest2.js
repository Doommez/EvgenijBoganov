var ctx = canvas.getContext("2d");
var arcX = 100, arcY = 100, lineX = 0, lineY = 0, 
    r = 25, br = 5, bullets = [];
var vector = [
  [[ 0, -1], 87], 
  [[ 0,  1], 83], 
  [[-1,  0], 65],
  [[ 1,  0], 68]
].map(el => ({
    direction: el[0],
    keyCode: el[1],
    speed: 0,
    active: -1
}))
 
let keyHandler = (e, active) => vector.forEach(v => v.keyCode === e.keyCode && (v.active = active))
document.addEventListener('keydown', e => keyHandler(e, 1))
document.addEventListener('keyup', e => keyHandler(e, -1))
canvas.addEventListener('mousemove',  e => {
   lineX = e.layerX, lineY = e.layerY;
})

canvas.addEventListener('click',  e => {
   let x = e.layerX - arcX, y = e.layerY - arcY;
   let max = Math.max(Math.abs(x), Math.abs(y));
   let a = Math.atan2(y,x);
   // по клику добавляем информацию о  снаряде в массив  
   bullets.push({
     to: [x/max, y/max], // нормализованный вектор движения
     pos: [arcX+Math.cos(a)*r*1.5, arcY+Math.sin(a)*r*1.5], // положение 
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
  

  // это откладывает вызов функции `draw` до следующего момента, 
  //когда браузер будет готов нарисовать следующий кадр
  requestAnimationFrame(draw) 
}

function tick () {

  vector.forEach(v => {
    v.speed = Math.min(5, Math.max(v.speed + 0.1*v.active, 0))
    arcX = Math.min(canvas.width-r, Math.max(arcX + v.direction[0]*v.speed, 0+r));
    arcY = Math.min(canvas.height-r, Math.max(arcY + v.direction[1]*v.speed, 0+r));
  })
  
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

}