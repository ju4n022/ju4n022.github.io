const prodinfo = document.getElementById("info-prod"); // seteo constante que corresponde al div de ese ID, donde dibujaré la tabla
var product = "https://japceibal.github.io/emercado-api/products/";

const commentsinfo = document.getElementById("comments");
var comments = "https://japceibal.github.io/emercado-api/products_comments/";

let currentProductInfo = [];
let currentCommentsInfo = [];

document.addEventListener("DOMContentLoaded", function (e) {

  let productinfo = localStorage.getItem("catIDinfo"); //obtengo por id mediante storage
  let url = product + productinfo + ".json"; // concatené para evitar los if

  getJSONData(url).then(function (resultObj) {

    if (resultObj.status === 'ok') {

      currentProductInfo = resultObj.data //currentProductInfo es la data del result.Obj
      MostrarInfo(); //llamo a la funcion mostrar info para que añada esta informacion obtenida a la página mediante innerHTML


    }
  });

  LoadComments();





});

//dudas varias
function LoadComments(){
  let productinfo = localStorage.getItem("catIDinfo"); //obtengo por id mediante storage

  let url_comments = comments + productinfo + ".json";
  
  getJSONData(url_comments).then(function (resultObj) {
  
    if (resultObj.status === 'ok') {
  
      currentCommentsInfo = resultObj.data //currentCommentsInfo es la data del result.Obj
      MostrarComments(); //llamo a la funcion mostrar info para que añada esta informacion obtenida a la página mediante innerHTML
    }
  });

}



function MostrarInfo() {

  prodinfo.innerHTML = "";

  prodinfo.innerHTML = `
    
    
        <div> <h1>${currentProductInfo.name}</h1>

            <h3> Precio: ${currentProductInfo.currency} ${currentProductInfo.cost}</h3>

            <h3> Hemos vendido: ${currentProductInfo.soldCount} artículos</h3>
            
        
        <b>"Descripcion"</b>${currentProductInfo.description}</div>


` //cambiar forma de mostrar
}

//No se si anda

function MostrarComments() {

  commentsinfo.innerHTML = "";

  currentCommentsInfo.forEach(comentario => {
    
    commentsinfo.innerHTML += `<div class="card">
  
    <div class="col">
        <div>
            <h4 class="mb-1">${comentario.user} - ${comentario.dateTime} ${comentario.score}  </h4>
            
        <p class="mb-1">${comentario.description}</p>
    </div>
  </div> ` //cambiar forma de mostrar
  

  });
}