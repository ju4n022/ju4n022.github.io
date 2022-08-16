function validar() {
    //capturar valores de los campos//

    let email = document.getElementById("floatingInput");
    let password = document.getElementById("floatingPassword");
    console.log(email);
    console.log(password);

    //validacion Novacio

    if (email=="" || password=="") {
        alert("ingrese algun valor")
    }

    

}