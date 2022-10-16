var cart_list = "https://japceibal.github.io/emercado-api/user_cart/";
const carritoInfo = document.getElementById("carrito");



document.addEventListener("DOMContentLoaded", function (e) { 

    
    let url = cart_list + "25801" + ".json"; 


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
  let articulo = JSON.parse(decodeURIComponent(obj)); //reconvierte los string a objeto
  var total = value * articulo.unitCost; //multiplica el valor que  esté en el input por el costo del articulo
  var subTotal = articulo.currency + " " + total; // USD + "ESPACIO VACIO + TOTAL"
  document.getElementById("subtotal-"+ articulo.id).innerHTML = subTotal; //agrego mediante innerHTML ese subtotal que me dio, al input de id "subtotal-" y le concateno la ID del articulo
}