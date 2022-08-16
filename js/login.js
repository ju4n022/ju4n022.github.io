function validar(){
    //capturar valores de los campos//

    noVacio = document.getElementById("floatingInput").value;
    numero = document.getElementById("floatingPassword").value;
    console.log(NoVacio);
    console.log(numero);

//validacion Novacio

if(noVacio.length==0 || numero.lenght==0){
    alert("ingrese algun valor")
}

validar()

}