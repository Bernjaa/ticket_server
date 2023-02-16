const express = require('express');
const cors = require('cors');
const ticket = new express();
//configuraciones de el servidor
ticket.set('port', process.env.PORT || 4080);
ticket.use(cors())
ticket.use(express.json())

//configuracion de ruta
ticket.use(require("./rutas/ticket.ruta"))

//instancia de servidor
ticket.listen(ticket.get('port'), ()=>{
    console.log(ticket.get('port'))
})