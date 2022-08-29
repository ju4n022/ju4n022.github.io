let email = document.getElementById("floatingInput").value;
let password = document.getElementById("floatingPassword").value;
//capturar valores de los campos//

function validar() {



    console.log(email);
    console.log(password);

    //validacion Novacio

    if (email == "" || password == "") {
        alert("ingrese algun valor")
    }
    else {
        alert("Bienvenido K-po")
    }
    GuardarEmail();
}



function GuardarEmail() {
    let user = document.getElementById("floatingInput").value;
    localStorage.setItem("usuario", user);
    console.log(user)
}