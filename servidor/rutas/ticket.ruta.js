const { Router } = require("express");
const ticket = require("../base_de_datos/models/tickets.models").TICKET;

const router = new Router();

router.get("/", (req, res) => {
  let se = new ticket({
    id_ticket: "10000001",
    usuario: "valeria",
    descripcion: "no tengo computador, ni menos internet",
    ubicacion: "oficina mantenimiento",
    start_date: null, // fecha en la que se toma el ticket
    urgencia: "urgente",
    estado: "",
    asignado: "",
    close_date: null, // fecha en la que se cierra el ticket
    titulo: "no tengo nada",
    create_date: Date(), // fecha en la que el ususario crea el ticket
  });
  se.save();

  return res.status(200).json({
    body: "El ticket se guardo con exito",
  });
});

router.post("/get_ticket_user", async (req, res) => {
  const {user} = req.body
  
  const ticket_list = await ticket.find({usuario:String(user)});
  let arr_close = ticket_list.filter(item =>item.estado==='CERRADO')
  let arr_others = ticket_list.filter(item =>item.estado!=='CERRADO')
  return res.status(200).json({
    body: {arr_close:arr_close,arr_others:arr_others},
  });
});

router.get("/edit_ticket", async (req, res) => {
  await ticket.updateOne({ id_ticket: "10000002" }, { usuario: "Karen" });
  return res.status(200).json({
    body: "El ticket fue editado exitosamente",
  });
});

router.post("/get_ticket_tecnico", async (req, res) => {
const {user} = req.body

const another_ticket_list = await ticket.find({usuario:String(user)});
  let arr_all_tickets = another_ticket_list.filter(item=>item.estado!=='CERRADO')

  return res.status(200).json({
    body: {arr_all_tickets:arr_all_tickets},
  });
});


module.exports = router;
