//determinar una constante que almacene una lista JSON mediante un await fetch

const lista_autos = await fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then(response => response.json());
//console.log(lista_autos.products[1].name)//test

//determino constante que haga referencia a los elementos de la ID correspondiente
const contenedor = document.getElementById("contenedor");


//armo la funcion pagina, la cual uso un for para que recorrar una cierta lista(variable)

//agrego mediante inner.HMTL y luego los ${}(esto lo saqué del categories.js y lo reconstruí) son para llamar a los elementos de esa lista previamente definida

//los div los copie y pegué del categories.js que era muy parecido 

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








