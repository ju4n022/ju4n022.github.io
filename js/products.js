const url_lista_autos = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const url_lista_juguetes = "https://japceibal.github.io/emercado-api/cats_products/102.json"
const url_lista_muebles = "https://japceibal.github.io/emercado-api/cats_products/103.json"
const url_lista_herramientas = "https://japceibal.github.io/emercado-api/cats_products/104.json"
const url_lista_computadoras = "https://japceibal.github.io/emercado-api/cats_products/105.json"
const url_lista_vestimenta = "https://japceibal.github.io/emercado-api/cats_products/106.json"
const url_lista_electrodomesticos = "https://japceibal.github.io/emercado-api/cats_products/107.json"
const url_lista_deporte = "https://japceibal.github.io/emercado-api/cats_products/108.json"
const url_lista_celulares = "https://japceibal.github.io/emercado-api/cats_products/109.json"



//defino las listas mediante const que luego invocaré, la maryoria están vacios//


let minPrice = undefined;
let maxPrice = undefined;
const ORDER_BY_PRICE = "Price.";
let currentProductsArray = [];


document.addEventListener("DOMContentLoaded", function(e){
    let categorias = localStorage.getItem("catID");
    let url="";

    if(categorias == 101){ 
      url=url_lista_autos;
    }
    if(categorias == 102){ 
        url=url_lista_juguetes;
      }
      if(categorias == 103){ 
        url=url_lista_muebless;
      }
      if(categorias == 104){ 
        url=url_lista_herramientas;
      }
      if(categorias == 105){ 
        url=url_lista_computadoras;
      }
      if(categorias == 106){ 
        url=url_lista_vestimenta;
      }
      if(categorias == 107){ 
        url=url_lista_electrodomesticos;
      }
      if(categorias == 108){ 
        url=url_lista_deporte;
      }
      if(categorias == 109){ 
        url=url_lista_celulares;
      }


    getJSONData(url).then(function(resultObj){
        if (resultObj.status === 'ok')
        {
            currentProductsArray = resultObj.data
            FilterAndSortPage();
        }
    });
 });
   
 function Filter(){
  //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
  //de productos por categoría.
  minPrice = document.getElementById("rangeFilterPriceMin").value;
  maxPrice = document.getElementById("rangeFilterPriceMax").value;
//filtro de precio

  if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
      minPrice = parseInt(minPrice);
  }
  else{
      minPrice = undefined;
  }

  if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
      maxPrice = parseInt(maxPrice);
  }
  else{
      maxPrice = undefined;
  }

  FilterAndSortPage();
}

const contenedor = document.getElementById("contenedor");

function FilterAndSortPage() {
  contenedor.innerHTML ="";
    var min = minPrice;
    var max = maxPrice;

    for (let i = 0; i < currentProductsArray.products.length; i++) {
       var product = currentProductsArray.products[i];
       if (((min == undefined) || (min != undefined && parseInt(product.cost) >= min)) &&
          ((max == undefined) || (max != undefined && parseInt(product.cost) <= max))){

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

//Le indico que cuando haga click en el input de esa id, ocurras esas funciones, que despues defino

document.getElementById("sortPriceAsc").addEventListener("click", function () {
  sortAndShowProducts(ORDER_BY_PRICE_ASC);
});
document.getElementById("sortPriceDesc").addEventListener("click", function () {
  sortAndShowProducts(ORDER_BY_PRICE_DESC);
});



function sortAndShowProducts(sortCriteria, productsArray){
  currentSortCriteria = sortCriteria;

  currentProductsArray = sortPruducts(currentSortCriteria, currentProductsArray);

  //Muestro las categorías ordenadas
  FilterAndSortPage();
}


//Filtro ascendente y descendente copie y modifique el que aparecia por vendidos en el categories

function sortPruducts(criteria, array) {
  let result = [];

  if (criteria === ORDER_BY_PRICE_DESC) {
    result = array.products.sort(function(a, b) {
      let aCost = parseInt(a.cost);
      let bCost = parseInt(b.cost);

      
      if ( aCost > bCost ){ return 1; }
      if ( aCost < bCost ){ return -1; }
      return 0;
  });
  }

  if (criteria === ORDER_BY_PRICE_ASC) {
    result = array.products.sort(function(a, b) {
      let aCost = parseInt(a.cost);
      let bCost = parseInt(b.cost);

      
      if ( aCost > bCost ){ return -1; }
      if ( aCost < bCost ){ return 1; }
      return 0;
  });
  }
  array.products = result; // le indicto que como resultado debe dar un array de los productos y luego hago que retorne dicho array
  return array;
}




















