var url_lista = "https://japceibal.github.io/emercado-api/cats_products/";

//Para entrega 3 necesito:

function setCatIDinfo(id) {       //aqui es como guardo la ID de cada producto, para luego pegar su informacion redireccionando a "product-info.html"
  localStorage.setItem("catIDinfo", id);
  window.location = "product-info.html";

}



//defino las listas mediante un var, que luego solo cambiará la ultima parte


let minPrice = undefined;
let maxPrice = undefined;
const ORDER_BY_PRICE_ASC = "ASC";
const ORDER_BY_PRICE_DESC = "DESC";
const ORDER_BY_REL_ASC = "REL";

let currentProductsArray = [];


document.addEventListener("DOMContentLoaded", function (e) {
  let categorias = localStorage.getItem("catID"); // seteo categorias que es el ID que obtiene el localstorage  
  let url = url_lista + categorias + ".json" // obtengo las listas concatenando la primera parte de la URL + el id que corresponda + .json

 


  getJSONData(url).then(function (resultObj) {
    
    if (resultObj.status === 'ok') {
      
      currentProductsArray = resultObj.data
      FilterAndSortPage();
      

    }
  });
});

function Filter() {

  //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
  //de productos por categoría.

  minPrice = document.getElementById("rangeFilterPriceMin").value;
  maxPrice = document.getElementById("rangeFilterPriceMax").value;

  //filtro de precio


  if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
    minPrice = parseInt(minPrice);
  }
  else {
    minPrice = undefined;
  }

  if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
    maxPrice = parseInt(maxPrice);
  }
  else {
    maxPrice = undefined;
  }

  FilterAndSortPage();
}

const contenedor = document.getElementById("contenedor");

function FilterAndSortPage() {
  contenedor.innerHTML = "";
  var min = minPrice;
  var max = maxPrice;

  for (let i = 0; i < currentProductsArray.products.length; i++) {
    var product = currentProductsArray.products[i];
    if (((min == undefined) || (min != undefined && parseInt(product.cost) >= min)) &&
      ((max == undefined) || (max != undefined && parseInt(product.cost) <= max))) {

      contenedor.innerHTML += `<div onclick="setCatIDinfo(${product.id})" class="row">
        <div class="col-3">
            <img  src= ${product.image} alt='NO SE CARGA LA IMAGEN' class='img-thumbnail'>
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





document.getElementById("sortPriceAsc").addEventListener("click", function () {
  sortAndShowProducts(ORDER_BY_PRICE_ASC);
});
document.getElementById("sortPriceDesc").addEventListener("click", function () {
  sortAndShowProducts(ORDER_BY_PRICE_DESC);
});
document.getElementById("sortByRel").addEventListener("click", function () {
  sortAndShowProducts(ORDER_BY_REL_ASC);
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

  else if (criteria === ORDER_BY_PRICE_ASC) {
    result = array.products.sort(function(a, b) {
      let aCost = parseInt(a.cost);
      let bCost = parseInt(b.cost);

      
      if ( aCost > bCost ){ return -1; }
      if ( aCost < bCost ){ return 1; }
      return 0;
  });
  }

  else if (criteria === ORDER_BY_REL_ASC) {
    result = array.products.sort(function (a, b) {
      let aRel = parseInt(a.soldCount);
      let bRel = parseInt(b.soldCount);


      if (aRel > bRel) { return -1; }
      if (aRel < bRel) { return 1; }
      return 0;
    });
  }
  array.products = result;
  return array;
}
