const url_lista_autos = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const url_lista_juguetes = "https://japceibal.github.io/emercado-api/cats_products/102.json"
const url_lista_muebles = "https://japceibal.github.io/emercado-api/cats_products/103.json"
const url_lista_herramientas = "https://japceibal.github.io/emercado-api/cats_products/104.json"
const url_lista_computadoras = "https://japceibal.github.io/emercado-api/cats_products/105.json"
const url_lista_vestimenta = "https://japceibal.github.io/emercado-api/cats_products/106.json"
const url_lista_electrodomesticos = "https://japceibal.github.io/emercado-api/cats_products/107.json"
const url_lista_deporte = "https://japceibal.github.io/emercado-api/cats_products/108.json"
const url_lista_celulares = "https://japceibal.github.io/emercado-api/cats_products/109.json"

//defino las listas mediante const = url que luego invocaré, la maryoria están vacios//


let minPrice = undefined;
let maxPrice = undefined;
const ORDER_BY_PRICE = "Price.";
let currentProductsArray = [];

//defino constantes y variables que necesitaré para los filtros


document.addEventListener("DOMContentLoaded", function (e) {
    let categorias = localStorage.getItem("catID");
    let url = "";

    //carga los datos "DOM" del url que le indico, segun su catID

    if (categorias == 101) {
        url = url_lista_autos;
    }
    if (categorias == 102) {
        url = url_lista_juguetes;
    }
    if (categorias == 103) {
        url = url_lista_muebless;
    }
    if (categorias == 104) {
        url = url_lista_herramientas;
    }
    if (categorias == 105) {
        url = url_lista_computadoras;
    }
    if (categorias == 106) {
        url = url_lista_vestimenta;
    }
    if (categorias == 107) {
        url = url_lista_electrodomesticos;
    }
    if (categorias == 108) {
        url = url_lista_deporte;
    }
    if (categorias == 109) {
        url = url_lista_celulares;
    }


    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === 'ok') {
            currentProductsArray = resultObj.data
            FilterAndSortPage();
        }
    });
});







const contenedor = document.getElementById("contenedor");

function FilterAndSortPage() {

    var min = minPrice;
    var max = maxPrice;

    for (let i = 0; i < currentProductsArray.products.length; i++) {
        var product = currentProductsArray.products[i];

        if (((min == undefined) || (min != undefined && parseInt(product.cost) >= min)) &&
            ((max == undefined) || (max != undefined && parseInt(product.cost) <= max))) {

            contenedor.innerHTML += `<div class="row">
        <div class="col-3">
            <img src= ${product.image} alt='NO SE CARGA LA IMAGEN' class='img-thumbnail'>
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}  </h4>
                <small class="text-muted">${product.soldCount} artículos</small>
            </div>
            <p class="mb-1">${product.description}</p>
        </div>
    </div> `
        }


    }
}






