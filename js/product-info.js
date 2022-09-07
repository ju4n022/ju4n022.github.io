var product = "https://japceibal.github.io/emercado-api/products/";
const prodinfo = document.getElementById("info-prod"); // seteo constante que corresponde al div de ese ID, donde dibujaré la tabla

let currentProductInfo = {};

document.addEventListener("DOMContentLoaded", function (e) {
    
    let productinfo = localStorage.getItem("catIDinfo"); //obtengo por id mediante storage
    let url = product + productinfo + ".json"; // concatené para evitar los if
    
    getJSONData(url).then(function (resultObj) {
      
      if (resultObj.status === 'ok') {
         
        currentProductInfo = resultObj.data //currentProductInfo es la data del result.Obj
        MostrarInfo(); //llamo a la funcion mostrar info para que añada esta informacion obtenida a la página mediante innerHTML
        
  
      }
    });
  });

  function MostrarInfo() {

    prodinfo.innerHTML = "";

    prodinfo.innerHTML = `<div class="row">
    
    <div class="col">
        <div>
            <h4 class="mb-1">${currentProductInfo.name} - ${currentProductInfo.currency} ${currentProductInfo.cost}  </h4>
            <small class="text-muted">${currentProductInfo.soldCount} artículos</small>
        </div>
        <p class="mb-1">${currentProductInfo.description}</p>
    </div>
</div> ` //cambiar forma de mostrar

    
    
  
}

/* <div class="col-3">
    
        <img  src= ${currentProductInfo.images} alt='NO SE CARGA LA IMAGEN' class='img-thumbnail'>
    </div> */