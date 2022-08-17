function validar() {
    //capturar valores de los campos//
    let email = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;
    //validacion
    if (email == "" || password == "") {
        alert("ingrese algun valor")
    }
}