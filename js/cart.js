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
        <div class="card" style="width: 18rem;">
  <img src="${articulo.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${articulo.name}</h5>
    <h5 class="card-title">${articulo.currency}</h5>
    <h5 class="card-title">${costoTotal}</h5>

    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>


<table>
  <tr>
    <th>Nombre</th>
    <th>Imagen</th>
    <th>Precio</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>
        
        `

    });





}

function setProductinfo(id) {       //aqui es como guardo la ID de cada producto, para luego pegar su informacion redireccionando a "product-info.html"
    localStorage.setItem("catIDinfo", id);
}

