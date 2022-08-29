const lista_autos = await fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
.then(response => response.json());
const lista_juguetes = await fetch("https://japceibal.github.io/emercado-api/cats_products/102.json")
.then(response => response.json());
const lista_muebles = await fetch("https://japceibal.github.io/emercado-api/cats_products/103.json")
.then(response => response.json());
const lista_herramientas = await fetch("https://japceibal.github.io/emercado-api/cats_products/104.json")
.then(response => response.json());
const lista_computadoras = await fetch("https://japceibal.github.io/emercado-api/cats_products/105.json")
.then(response => response.json());
const lista_vestimenta = await fetch("https://japceibal.github.io/emercado-api/cats_products/106.json")
.then(response => response.json());
const lista_electrodomesticos = await fetch("https://japceibal.github.io/emercado-api/cats_products/107.json")
.then(response => response.json());
const lista_deporte = await fetch("https://japceibal.github.io/emercado-api/cats_products/108.json")
.then(response => response.json());
const lista_celulares = await fetch("https://japceibal.github.io/emercado-api/cats_products/109.json")
.then(response => response.json());


//mayoria vacios//





    
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

let productos;
let categorias = localStorage.getItem("catID");

if(categorias == 101){ 
    productos = lista_autos;

}
else if (categorias == 102){
    productos = lista_juguetes;
}

else if (categorias == 103){
    productos = lista_muebles;
}
else if (categorias == 104){
    productos = lista_herramientas;
}
else if (categorias == 105){
    productos = lista_computadoras;
}
else if (categorias == 106){
    productos = lista_vestimenta;
}
else if (categorias == 107){
    productos = lista_electrodomesticos;
}
else if (categorias == 108){
    productos = lista_deporte;
}
else if (categorias == 109){
    productos = lista_celulares;
}

pagina(productos)






