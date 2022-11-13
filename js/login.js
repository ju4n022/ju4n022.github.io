function validar() {

    let email = document.getElementById("floatingInput");
    let password = document.getElementById("floatingPassword");



    //validacion Novacio

    if (email.value == "" || password.value == "") {
        alert("ingrese algun valor");
        
        
        


    }
    else {
        alert("Bienvenido genio del futbol mundial");
        GuardarEmail();

    };

};

function GuardarEmail() {

    let userEmail = document.getElementById("floatingInput").value;

    localStorage.setItem("usuario", userEmail);
    if (localStorage.getItem("usuario") != null) { //si ese elemento no es vacio, entonce leteo un objeto con todo vacio menos email

        let perfil = {
            nombre: "",
            segundoNombre: "",
            apelldo: "",
            segApellido: "",
            email: userEmail,
            celu: ""
        };
        localStorage.setItem("perfil", JSON.stringify(perfil));
        window.location.href = "my-profile.html";
    };


};


//armo funcion que obtiene elemento por ID del email que se escribe, luego lo guarda en el localstorage con la ID "usuario" , y la ejecuto al final //