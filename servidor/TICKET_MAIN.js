const express = require('express');
const cors = require('cors');
const ticket = new express();

ticket.set('port', process.env.PORT || 4080);
ticket.use(cors())
ticket.use(express.json())

ticket.use(require("./rutas/ticket.ruta"))

ticket.listen(ticket.get('port'), ()=>{
    console.log(ticket.get('port'))
})