const mongoose = require('mongoose');
//estructura de la tabla de tecnico
const {Schema} = mongoose;
let tecnico_schema = new Schema({
    "password":{type:String},
    "email":{type:String},
    "estado":{type:Boolean}
})



module.exports = tecnico_schema;