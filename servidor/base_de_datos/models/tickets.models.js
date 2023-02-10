const {dbTicket} = require('../conexion.bd');
const ticket = require('../schemas/ticket.schema');

const model = {
    TICKET:dbTicket.model("ticket",ticket)
} 
module.exports = model;