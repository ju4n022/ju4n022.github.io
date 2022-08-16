const lista_autos = await fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then(response => response.json());
//console.log(lista_autos.products[1].name)//
const contenedor = document.getElementById("contenedor");

function pagina(lista_de_autos) {

    for (let i = 0; i < lista_de_autos.products.length; i++) {
        contenedor.innerHTML += `<div class="row">
        <div class="col-3">
            <img src="${lista_de_autos.products[i].image}" alt="NO SE CARGA LA IMAGEN" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">${lista_de_autos.products[i].name} - ${lista_de_autos.products[i].currency} ${lista_de_autos.products[i].cost}  </h4>
                <small class="text-muted">${lista_de_autos.products[i].soldCount} artículos</small>
            </div>
            <p class="mb-1">${lista_de_autos.products[i].description}</p>
        </div>
    </div> `
        

    }
}
pagina(lista_autos)








