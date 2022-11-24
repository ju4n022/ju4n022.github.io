
const express = require("express");

const router = express.Router();

const path = require("path");

/*
get = sirve para pedir info al sv
post = sirve para crear info en el sv
put =  sirve para editar info en el SV
delete = sirve para borrar info en el sv
*/

router.get("/products/:id", (req, res) => {

const id = req.params.id //obtengo id que será dinámico por cada producto
res.header("Content-type", "application/json") //el header será de contenido JSON
    res.sendFile(path.join(__dirname, '/datos/products/', id)); 
    
    //aqui envio el archivo JSON que va a estar dado por su __dirname(ubbacion en el directorio) +/datos/products/ + su ID correspondiente
});

module.exports = router;






