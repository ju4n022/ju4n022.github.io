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

//armo funcion que obtiene elemento por ID del email que se escribe, luego lo guarda en el localstorage con la ID "usuario" , esa variable letie//