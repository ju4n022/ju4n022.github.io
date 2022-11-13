window.addEventListener("load", function () {

    
    

    let profile = JSON.parse(localStorage.getItem("perfil"));
    console.log("estoy aca" + profile);
    document.getElementById("name").value = profile.nombre;
    document.getElementById("secondName").value = profile.segundoNombre;
    document.getElementById("surName").value = profile.apelldo;
    document.getElementById("secondSurname").value = profile.segApellido;
    document.getElementById("number").value = profile.celu;
    document.getElementById("emailInp").value = profile.email;

    console.log(profile.nombre);


});

/* function isEmtpy(str) {
    return (!str || str.length === 0);
} */


function Validar(firstName, segundoNombre, apellido, segundoApellido, email, number) {

    var isValid = true

    if (firstName == "" || apellido == "" || email == "") {
        isValid = false;
    }
    return isValid;


};

function SaveProfile() {

    const firstName = document.getElementById("name").value;
    const segundoNombre = document.getElementById("secondName").value;
    const apellido = document.getElementById("surName").value;
    const segundoApellido = document.getElementById("secondSurname").value;
    const email = document.getElementById("emailInp").value;
    const number = document.getElementById("number").value;





    if (Validar(firstName, segundoNombre, apellido, segundoApellido, email, number)) {

        let perfil = {
            nombre: firstName,
            segundoNombre: segundoNombre,
            apelldo: apellido,
            segApellido: segundoApellido,
            email: email,
            celu: number
        };
        localStorage.setItem("perfil", JSON.stringify(perfil));
        alert('Datos guardados correctamente');

    }
    else {
        alert('Faltan datos');

    }
    console.log(perfil.email)
};
