const mongoose = require('mongoose');
const {Schema} = mongoose;
let ticket_schema = new Schema({
    "id_ticket":{type: String},
    "usuario":{type:String},
    "descripcion":{type:String},
    "ubicacion":{type:String},
    "start_date":{type:Date},
    "urgencia":{type:String},
    "estado":{type:String},
    "asignado":{type:String},
    "close_date":{type:Date},
    "titulo":{type:String},
    "create_date":{type:Date}
})

module.exports = ticket_schema;