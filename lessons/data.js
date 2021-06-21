const phone = [
    {
      model: "samsung",
      imgUrl:"sam.jpg",
      color: "red",
      descriptions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam consequuntur quis velit aut facere exercitationem vel reprehenderit ab quibusdam possimus. Enim soluta qui itaque saepe, maiores doloremque aperiam dolorem a?",
      price: 1000,
      sale: true
    },
    {
      model: "apple",
      imgUrl:"phone1.jpeg",
      color: "silver",
      descriptions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam consequuntur quis velit aut facere exercitationem vel reprehenderit ab quibusdam possimus. Enim soluta qui itaque saepe, maiores doloremque aperiam dolorem a?",
      price: 1100,
      sale: true
    },
    {
      model: "nokia",
      imgUrl:"phone1.jpeg",
      color: "blue",
      descriptions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam consequuntur quis velit aut facere exercitationem vel reprehenderit ab quibusdam possimus. Enim soluta qui itaque saepe, maiores doloremque aperiam dolorem a?",
      price: 900,
      sale: true
    }
  ];
  
  
    let html="";
    for(let i=0;i<phone.length;i++){
    html+=`<div class="card" style="width: 18rem;">
    <img src="${phone[i].imgUrl}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone[i].model}</h5>
      <p class="card-text">${phone[i].descriptions}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`}
    let app= document.getElementById('app');
    app.innerHTML=html;
  