// div de la info del carrito
const carritoInfo = document.getElementById("carrito");
//div de los costos del carrito
const costos = document.getElementById("costos");

// Boton premium
const premium = document.getElementById("prem");

// Boton express
const express = document.getElementById("exp");

// Boton standard
const standart = document.getElementById("stan");

//Chekbox tarjeta 
const checkTarj = document.getElementById("cred");

// Input de texto numero de tarjeta
const tarjInput = document.getElementById("numTarj");

// Input de texto codigo de seguridad
const codInput = document.getElementById("cod");

// Input de texto fecha de vencimiento
const vencInput = document.getElementById("venc");

// Checkbox transferencia bancaria
const checkBank = document.getElementById("transfBanc");

// Input de texto numero de cuenta
const bankInput = document.getElementById("numCuen");

//div de la forma de pago
const formaH1 = document.getElementById("formaH1");

//input de la calle del formulario
const street = document.getElementById("calle");

//input del numero del formulario
const number = document.getElementById("numPuerta");

//input de la esquina del formulario
const esq = document.getElementById("esquina");



function mostrarCarrito() { //funcion que solo muestra lo que voy comprando (la invoco en el boton comprar en pr-infoHTML)

  let productos = JSON.parse(localStorage.getItem("articulos")); //seteo let que será un parse del LS del arreglo articulos


  productos.forEach(item => { //recorro este arreglo ya parseado mediante JSON.parse

    const subtotal = item.cantidad * Number(item.cost); //declaro constante subtotal que será cada item.cantidad por su item.cost
    carritoInfo.innerHTML += ` 
          
  <style>
  table, th, td {
    border: 5px solid blue;
    padding: 0;
    text-align: center;
    font-family: arial; 
    margin: 0;
  }
  
  thead{
    border-bottom: solid 5px;
  }
  
  tr:hover{
    background-color: pink;
  }
  </style>
  
  <table class="table table-bordered">
    
    <tr>
      <td><img src="${item.img}" class="card-img-top" alt="..." style="width: 18rem; overflow-x: auto; display: block;"></td>
      <td><h5 class="card-title">${item.name}</h5></td>
      <td><h5 class="card-title"> ${item.currency}  ${item.cost}</h5></td>
      <td><input type="number" min="1" max="999" value="${item.cantidad}" id="${item.id}" onchange="changeSubTotal(this.value,'${encodeURIComponent(JSON.stringify(item))}')"></td>
      <td><h5 class="card-title" id="subtotal-${item.id}"> ${item.currency}  ${subtotal}</h5></td>
    </tr>
   
    
  </table>
`
    //Agrego con innerHTML tabla con la informacion del producto que agrego al carrito
  });
  agregarTotales();

};




function changeSubTotal(value, obj) {
  let articulo = JSON.parse(decodeURIComponent(obj));
  let carro = JSON.parse(localStorage.getItem("articulos"));
  console.log(articulo)
  let currentProd = carro.find(item => item.id === articulo.id);
  let indice = carro.indexOf(currentProd);
  carro[indice].cantidad = value; //edito cantidad y le doy "value"
  localStorage.setItem("articulos", JSON.stringify(carro)); //defino en LS un arreglo con la clave articulos - stringify: convierte string en arreglo
  var total = value * articulo.cost;
  var subTotal = articulo.currency + " " + total;
  document.getElementById("subtotal-" + articulo.id).innerHTML = subTotal;
  agregarTotales();

};

mostrarCarrito();

var costoEnvio = premium.value;

function agregarTotales() { //funcion que solo agrega totales mediante innerHTML


  let carro = JSON.parse(localStorage.getItem("articulos")); //traigo al carro a la funcion
  let total = 0;

  carro.forEach(item => { total += parseInt(item.cost * item.cantidad) }); //recorro cada articulo y su respectivo precio del carro y lo voy a agregando a "total"

  let porcentEnvio = premium.value; // el % de envio va variando con el listener CHANGE de la linea 131
  var costoEnvio = total * porcentEnvio; //el costo de envío será el total multiplicado por dicho % de envio
  var totalCompra = total + costoEnvio; // sumo el costo de envio + el total de los productos y pego mediante innerHTML estos datos en div costos

  costos.innerHTML = `<h1>Costos</h1>` + ` <ul class="list-group">
  <li class="list-group-item"><h2>Total Costo Productos (USD) </h2> <div><h4> $ ${total}</h4></div></li>
  <li class="list-group-item"><h2>Costo Envío (USD) </h2><div><h4> $ ${costoEnvio}</h4></div></li>
  <li class="list-group-item"><h2>Total(Envío incluído) (USD) </h2> <div><h4> $ ${totalCompra}</h4></div></li>
  
</ul> `;
  console.log(total)
  const radio = document.querySelectorAll('input[name="envio"]');
  radio.forEach(itemRadio => { //recorre cada elemento input "radio" y lo llamo itemRadio
    itemRadio.addEventListener("change", () => { //cada vez que se hace click en un radio, se obtiene su value(declarado en el HTML)
      porcentEnvio = itemRadio.value;
      costoEnvio = total * porcentEnvio;
      totalCompra = total + costoEnvio;
      costos.innerHTML = `<h1>Costos</h1>` + `

      <ul class="list-group">
      <li class="list-group-item"><h2>Total Costo Productos (USD) </h2> <div><h4> $ ${total}</h4></div></li>
      <li class="list-group-item"><h2>Costo Envío (USD) </h2><div><h4> $ ${costoEnvio}</h4></div></li>
      <li class="list-group-item"><h2>Total(Envío incluído) (USD) </h2> <div><h4> $ ${totalCompra}</h4></div></li>
      
    </ul>

      `;
    })
  });
};


//funcion del boton vaciar carro
function vaciarCarrito() { 

  let carro = JSON.parse(localStorage.getItem("articulos"));

  carro.length = 0;
  localStorage.setItem("articulos", JSON.stringify(carro));
  window.location.reload();
};

const formaPago = document.querySelectorAll('input[name="forma"]'); //selecciono todos los input de name=forma

formaPago.forEach(itemForma => { //recorro esa lista de inputs y cada vez que cambian, hago validaciones correspondientes y pego informacion mediante innerHTML
  itemForma.addEventListener("change", () => {

    if (itemForma.value == "bank") { //si ese value es "bank" (declarado en HTML), deshabilito  los input de la tarjeta y los hago no required; viceversa si este valor no es "bank"
      bankInput.disabled = false;
      bankInput.required = true;
      tarjInput.disabled = true;
      tarjInput.required = false;
      codInput.disabled = true;
      codInput.required = false;
      vencInput.disabled = true;
      vencInput.required = false;
      formaH1.innerHTML = `<div style="margin: 32px"><b><h1>Forma de pago</h1> Ha seleccionado: Transferencia Bancaria</b></div> `
    }
    else {
      bankInput.disabled = true;
      bankInput.required = false;
      tarjInput.disabled = false;
      tarjInput.required = true;
      codInput.disabled = false;
      codInput.required = true;
      vencInput.disabled = false;
      vencInput.required = true;
      formaH1.innerHTML = `<div style="margin: 32px"><b><h1>Forma de pago</h1> Ha seleccionado: Tarjeta de Crédito</b></div>`
    }
  })
});


function btnFinalizar() { //boton finalizar compra se asegura de que los input calle, numero y esquina sean no vacíos. Además de colocar un método de pago, si todo esto está completado, se realiza la compra

  if (street.value == "" || number.value == "" || esq.value == "") {
    alert("Rellene campos")
  }
  else if (tarjInput.value == "" && bankInput.value == "") { 
    alert("Olvidó colocar método de pago")
  }
  else {
    alert("Compra realizada con éxito!!");
  }
};
