const {dbTicket} = require('../conexion.bd');
const ticket = require('../schemas/ticket.schema');
const tecnico = require('../schemas/tecnico.schema');

const model = {
    TICKET:dbTicket.model("ticket",ticket),
    TECNICO:dbTicket.model("tecnico",tecnico)
}  


module.exports = model;