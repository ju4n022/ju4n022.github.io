const { Router } = require("express");
const express = require("express");
const { request } = require("http");
const router = express.Router();
const {compu} = require("./js/data");

/*
get = sirve para pedir info al sv
post = sirve para crear info en el sv
put =  sirve para editar info en el SV
delete = sirve para borrar info en el sv
*/

router.get("/contento", (req, res) => {
    res.json({
        status: "contento"
    })
});


router.get("/triste", (req, res) => {
    res.json({
        status: "triste"
    })
});
const objeto = {
    nombre : "gerardo",
    apellido : "otro"
};
router.get("/products", (req, res) => {
    res.json(compu)
});



module.exports = router;


