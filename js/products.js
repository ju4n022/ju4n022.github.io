
//determinar variable que responda a una lista JSON mediante await fetch

const lista_autos = await fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then(response => response.json());

//console.log(lista_autos.products[1].name)// test de la toma del valor

// determinar constante que invoque a los elementos de la ID correspondiente


const contenedor = document.getElementById("contenedor");


//determinar funcion que recorra esta lista JSON previamente armada

//agregar mediante inner.HTML la informacion del JSON

// los div fue un copiar pegar de lal archivo categories (muy similar a lo que me piden en products)

//mediante ${} se accede al alemente correspondiente de esa lista JSON

//comienza a la izquierda (col-3) con la imagen



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








