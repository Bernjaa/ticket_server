const {Router} = require('express');
const ticket = require('../base_de_datos/models/tickets.models').TICKET;

const router = new Router();

router.get("/", (req, res)=>{

    let se = new ticket({
        "id_ticket":"10000001",
        "usuario":"valeria",
        "descripcion":"no tengo computador, ni menos internet",
        "ubicacion":"oficina mantenimiento",
        "start_date":null,// fecha en la que se toma el ticket
        "urgencia":"urgente",
        "estado":"",
        "asignado":"",
        "close_date":null,// fecha en la que se cierra el ticket
        "titulo":"no tengo nada",
        "create_date":Date()// fecha en la que el ususario crea el ticket
    })
    se.save()
    
    return res.status(200).json({
        "body":"El ticket se guardo con exito"
    })

})

router.get('/get_ticket',async (req, res)=>{
    const ticket_list = await ticket.find()
    console.log(ticket_list)
    return res.status(200).json({
        "body":ticket_list
    })
})

router.get('/edit_ticket', async (req, res)=>{
    await ticket.updateOne({id_ticket:"10000002"},{usuario:"Karen"})
    return res.status(200).json({
        "body":"El ticket fue editado exitosamente"
    })
})

module.exports = router;