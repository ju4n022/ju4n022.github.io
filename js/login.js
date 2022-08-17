function validar() {
    //capturar valores de los campos//

    let email = document.getElementById("floatingInput").value;
    let password = document.getElementById("floatingPassword").value;
    console.log(email);
    console.log(password);

    //validacion Novacio

    if (email =="" || password =="") {
        alert("ingrese algun valor")
    }

    

}