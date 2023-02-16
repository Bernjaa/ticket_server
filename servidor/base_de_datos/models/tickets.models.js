const {dbTicket} = require('../conexion.bd');
const ticket = require('../schemas/ticket.schema');
const tecnico = require('../schemas/tecnico.schema');
//modelo de base de datos 
const model = {
    //instancia de la tabla tickets
    TICKET:dbTicket.model("ticket",ticket),
    //istancia de la tabla tecnicos
    TECNICO:dbTicket.model("tecnico",tecnico)
}  

//se exporta el modelo para ser usado
module.exports = model;