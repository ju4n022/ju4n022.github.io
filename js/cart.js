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

        var costoTotal = articulo.unitCost * articulo.count;

        carritoInfo.innerHTML += `
        <style>
        table, th, td{
          border: 1px solid black;
          border-collapse: collapse;
        }
        
        th, td{
          padding: 10px;
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
            <td><h5 class="card-title">${articulo.count}</h5></td>
            <td><h5 class="card-title"> ${articulo.currency} ${costoTotal}</h5></td>
          </tr>
          
        </table>
        
        `

    });





}

function setProductinfo(id) {       //aqui es como guardo la ID de cada producto, para luego pegar su informacion redireccionando a "product-info.html"
    localStorage.setItem("catIDinfo", id);
}

