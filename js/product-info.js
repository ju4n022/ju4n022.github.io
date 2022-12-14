const prodinfo = document.getElementById("info-prod"); // seteo constante que corresponde al div de ese ID, donde dibujaré la tabla
var product = "https://japceibal.github.io/emercado-api/products/";

const commentsinfo = document.getElementById("comments"); //seteo constante que corresponde al div de ese ID que dibujaré los comentarios
var comments = "https://japceibal.github.io/emercado-api/products_comments/";

const imagenes = document.getElementById("imagenes"); //seteo constante que corresponde al div de ese ID que dibujaré las imagenes
const relaProd = document.getElementById("relaProd");

let currentProductInfo = []; //lista de la informacion de los productos (vacia)
let currentCommentsInfo = []; //lista de los comentarios de los productos (vacia)




document.addEventListener("DOMContentLoaded", function (e) { //funcion que escucha eventos, cuando hago click en cierto div, obtiene mediante localstorage la ID del producto

  let productinfo = localStorage.getItem("catIDinfo"); //obtengo por id mediante storage
  let url = product + productinfo + ".json"; // concatené para evitar los if

  getJSONData(url).then(function (resultObj) {

    if (resultObj.status === 'ok') {

      currentProductInfo = resultObj.data  //currentProductInfo es la data del result.Obj
      MostrarInfo();
      

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
      MostrarComments();
      mostrarRelacionados(); //llamo a la funcion mostrar info para que añada esta informacion obtenida a la página mediante innerHTML
    }
  });

};

function MostrarInfo() { //funcion que llamaré arriba para mostrar la info del producto que corresponda, accedo al elemento mediante ${lista.dato} y los pego mediante innerHTML

  prodinfo.innerHTML = ""; //agrego al div prodinfo en html
  imagenes.innerHTML = ""; //agrego al div imagenes en html



  prodinfo.innerHTML = `
        <div><u> <h1>${currentProductInfo.name}</h1></u> 
          <div class="d-flex justify-content-end">
            <button class="btn btn-success" id="buy"  > Comprar </button>
            <span style="margin-left: 16px; margin-right: 8px  "> Cantidad de items </span>
            <input type="number" id="contador" min="1" value="1" style="width : 55px; heigth : 55px">
          </div>
            <h3> Precio:</h3> <h4><i> ${currentProductInfo.currency} ${currentProductInfo.cost}</i> </h4>
            <h3> Vendidos:</h3> <h4><i> ${currentProductInfo.soldCount} artículos</i> </h4>
        <h3><b> Descripcion :</b></h3> <h4><i> ${currentProductInfo.description}</i> </h4> </div>
        </br>
        `
        
        
        document.getElementById("buy").addEventListener ("click", ()=> {
          var count = document.getElementById("contador").value
          let producto = {
            id : currentProductInfo.id,
            name : currentProductInfo.name,
            cost : currentProductInfo.cost,
            cantidad : count,
            currency : currentProductInfo.currency,
            img : currentProductInfo.images[0],


          //terminar
          };
          agregarCarrito(producto)

          
        });

  currentProductInfo.images.forEach(element => { //recorro las imagenes de los productos con foreach y las llamo "element", dicho element será la src de la imagen de cada elemento

    imagenes.innerHTML += `
          <div class="gallery"> 
          <img src="${element}" >
          </div>`

    //uso la clase "gallery" y en ella agrego un IMG con los sources de cada imagen que se las traigo con ${element}, luego defino ancho y largo

  })};

function agregarCarrito (producto)  {

  console.log(producto)

//si ya existe, actualizar la cantidad, si no existe agregar al arreglo

  
  let carro = []; 
  

  if(localStorage.getItem("articulos")) {
    carro = JSON.parse(localStorage.getItem("articulos")); // trae lo que existe al carro ,  parse: lee lo que el stringify retorna
  }
   
  let existente = carro.find(item => item.id === producto.id);
  console.log(existente)
  if (existente){
    let index = carro.indexOf(existente);
    carro[index].cantidad = parseInt(existente.cantidad) + parseInt(producto.cantidad);
  } else {
    carro.push(producto); // pusheo ese dato en el LS
  }

 
  localStorage.setItem("articulos", JSON.stringify(carro)); //defino en LS un arreglo con la clave articulos - stringify: convierte string en arreglo

 };
  
function MostrarComments() { //armo funcion para mostrar comentarios de cada producto

  commentsinfo.innerHTML = "";

  currentCommentsInfo.forEach(comentario => { //recorro la lista de comentarios y llamo comentario a cada uno de ellos, luego armo un for para el score de las estrellas

    let score = ''; //defino variable que luego invocaré para agregar a un span que tendrá estrellas checked y no checked

    for (let i = 1; i <= 5; i++) {
      if (i <= comentario.score) { // la condicion: pinto estrella de color orange por cada "score" que tenga, el resto de estrellas (hasta 5) las deja sin pintar
        score += '<span class="fa fa-star checked"></span>';

      }
      else { //si no pasa lo de arriba agrego una negra (sin  pintar)
        score += '<span class="fa fa-star"></span>';
      }

    }

    commentsinfo.innerHTML += `
    
    
    <div class="card">
  
    <div class="col">
        <div>
        <h4> ${comentario.user} - FECHA Y HORA: ${comentario.dateTime} <span> - ${score} </span></h4>

        <p class="mb-1">${comentario.description}</p>
    </div>
  </div> `
  });
}


function setProductinfo(id) {       //aqui es como guardo la ID de cada producto, para luego pegar su informacion redireccionando a "product-info.html"
  localStorage.setItem("catIDinfo", id);
  window.location = "product-info.html";

};

function mostrarRelacionados() {


  currentProductInfo.relatedProducts.forEach(rela => { //recorro las imagenes de los relatedproductos con foreach y las llamo "rela", dicho rela será un nuevo item con info

    relaProd.innerHTML +=`
          <div> 
            <div class="gallery">
              <a onclick="setProductinfo(${rela.id})"> <img id="img" src="${rela.image}"> </a> 
              <div><h8>${rela.name}</h8></div>
            </div>
          </div>`


  })};