if(localStorage.getItem("usuario") != null){
    let contenido = "";
    let email = localStorage.getItem("usuario");
    contenido = email;
    document.getElementById("User").innerHTML = contenido;
}
// si el valor que agrego al LS no es nulo, entonces se agrega lo que se guarda en el usuario y se agrega mediante innerHTML a la etiqueta con ID "user"//
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});