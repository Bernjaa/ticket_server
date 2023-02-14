const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false);

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBURL}:27017/${process.env.DBNAME}`, {
useUnifiedTopology: true,
useNewUrlParser: true
})
.then(db => console.log('LA BASE DE DATOS SE HA CONECTADO CORRECTAMENTE'))
.catch(err => console.error(err));
dbTicket = mongoose.connection.useDb('ticket');
module.exports = {
  dbTicket
};


