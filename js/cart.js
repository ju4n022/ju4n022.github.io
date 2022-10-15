var cart_list = "https://japceibal.github.io/emercado-api/user_cart/";
const carritoInfo = document.getElementById("carrito");



document.addEventListener("DOMContentLoaded", function (e) { //funcion que escucha eventos, cuando hago click en cierto div, obtiene mediante localstorage la ID del producto

    let carrito = localStorage.getItem("catIDinfo"); //obtengo por id mediante storage
    let url = cart_list + "25801" + ".json"; // concatené para evitar los if


    getJSONData(url).then(function (resultObj) {

        if (resultObj.status === 'ok') {

            currentCartInfo = resultObj.data  //currentProductInfo es la data del result.Obj
            mostrarCarrito();
        }
    });
});


function mostrarCarrito() {

  carritoInfo.innerHTML = "";



  currentCartInfo.articles.forEach(articulo => {

    carritoInfo.innerHTML += `
        
<style>
table, th, td {
  border: 5px dotted blue;
  border-collapse: collapse;
  padding: 1rem;
  text-align: center;
  font-family: arial; 
  margin: auto
}

thead{
  border-bottom: solid 5px;
}

tr:hover{
  background-color: pink;
}
</style>

<table class="col-12" style="width:100%;">
  <tr>
    <th>     </th>
    <th>Nombre</th>
    <th> Costo </th>
    <th> Cantidad </th>
    <th>Subtotal</th>
  </tr>
  <tr>
    <td><img src="${articulo.image}" class="card-img-top" alt="..." style="width: 18rem; overflow-x: auto; display: block;"></td>
    <td><h5 class="card-title">${articulo.name}</h5></td>
    <td><h5 class="card-title"> ${articulo.currency}  ${articulo.unitCost}</h5></td>
    <td><input type="number" min="1" max="999" value="1" id="${articulo.id}" onchange="changeSubTotal(this.value,'${encodeURIComponent(JSON.stringify(articulo))}')"></td>
    <td><h5 class="card-title" id="subtotal-${articulo.id}"> ${articulo.currency} ${articulo.unitCost} </h5></td>
  </tr>
  
</table>`
    

  });
}


function changeSubTotal(value,obj){
  let articulo = JSON.parse(decodeURIComponent(obj));
  var total = value * articulo.unitCost;
  var subTotal = articulo.currency + " " + total;
  document.getElementById("subtotal-"+ articulo.id).innerHTML = subTotal;
}