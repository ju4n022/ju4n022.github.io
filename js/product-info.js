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

function LoadComments() {
  let productinfo = localStorage.getItem("catIDinfo"); //obtengo por id mediante storage

  let url_comments = comments + productinfo + ".json";

  getJSONData(url_comments).then(function (resultObj) {

    if (resultObj.status === 'ok') {

      currentCommentsInfo = resultObj.data //currentCommentsInfo es la data del result.Obj
      MostrarComments(); //llamo a la funcion mostrar info para que añada esta informacion obtenida a la página mediante innerHTML
    }
  });

}
function MostrarInfo() { //funcion que llamaré arriba para mostrar la info del producto que corresponda, accedo al elemento mediante ${lista.dato} y los pego mediante innerHTML

  prodinfo.innerHTML = "";
  prodinfo.innerHTML = `
        <div> <h1>${currentProductInfo.name}</h1>
            <h3> Precio: ${currentProductInfo.currency} ${currentProductInfo.cost}</h3>
            <h3> Hemos vendido: ${currentProductInfo.soldCount} artículos </h3>
        <b>"Descripcion"</b>${currentProductInfo.description}</div> 
        </br>
        `
        currentProductInfo.images.forEach(element => { //recorro las imagenes de los productos con foreach y las llamo "element", dicho element será la src de la imagen de cada elemento
          prodinfo.innerHTML += `
          <div class="gallery"> 
          <img src="${element}" width="600" height="400">
          </div>`

      //uso la clase "gallery" y en ella agrego un IMG con los sources de cada imagen que se las traigo con ${element}, luego defino ancho y largo

  });   

}

function MostrarComments() { //armo funcion para mostrar comentarios de cada producto

  commentsinfo.innerHTML = "";

  currentCommentsInfo.forEach(comentario => { //recorro la lista de comentarios y llamo comentario a cada uno de ellos, luego armo un for para el score de las estrellas

    let score = ''; //defino variable que luego invocaré para agregar a un span que tendrá estrellas checked y no checked

    for (let i = 1; i <= 5; i++) {
      if(i<=comentario.score){ // la condicion: si ese i es menor o igual al score de ese comentario, entonces agrego una estrella pintada por cada "score" que tenga
        score += '<span class="fa fa-star checked"></span>';

      }
      else { //si no pasa lo de arriba agrego una negra (sin  pintar)
        score += '<span class="fa fa-star"></span>';
      }
      
    }




    commentsinfo.innerHTML += `
    
    </br>
    
    <div class="card">
  
    <div class="col">
        <div>
        <h4> ${comentario.user} - FECHA Y HORA: ${comentario.dateTime} <span> - ${score} </span></h4>

           
            
        <p class="mb-1">${comentario.description}</p>
    </div>
  </div> ` // score esta condicionado en el for de arriba
  });
}