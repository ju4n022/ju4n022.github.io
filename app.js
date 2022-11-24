const express = require("express");
const cors = require("cors");

const app = express();

app.set("port", 3001); //puerto

app.listen(app.get("port"), ()=> {
    console.log("Sv Up")
});
app.use(express.json()); // express

/*
get = sirve para pedir info al sv
post = sirve para crear info en el sv
put =  sirve para editar info en el SV
delete = sirve para borrar info en el sv
*/

const ruta = require("./routes");
app.use('/siempre', ruta);










