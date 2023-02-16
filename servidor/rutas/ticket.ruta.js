const { Router } = require("express");
//modelo de tickets
const ticket = require("../base_de_datos/models/tickets.models").TICKET;
//modelo de tecnico
const Tecnico = require("../base_de_datos/models/tickets.models").TECNICO;

//generador de rutas 
const router = new Router();

//ruta para obtener los datos de un ticket
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

//ruta para mostrar las 2 columnas de tickets del usuario
router.post("/get_ticket_user", async (req, res) => {
  const {user} = req.body
  
  const ticket_list = await ticket.find({usuario:String(user)});
  let arr_close = ticket_list.filter(item =>item.estado==='CERRADO')
  let arr_others = ticket_list.filter(item =>item.estado!=='CERRADO')
  return res.status(200).json({
    body: {arr_close:arr_close,arr_others:arr_others},
  });
});

//ruta para editar el ticket 
router.get("/edit_ticket", async (req, res) => {
  await ticket.updateOne({ id_ticket: "10000002" }, { usuario: "Karen" });
  return res.status(200).json({
    body: "El ticket fue editado exitosamente",
  });
});

//ruta para ver todos los tickets del tecnico
router.post("/get_ticket_tecnico", async (req, res) => {
const {user} = req.body
// console.log(user)

const another_ticket_list = await ticket.find();
  let arr_all_tickets = another_ticket_list.filter(item=>item.estado==='')
  let arr_close_tickets = another_ticket_list.filter(item=>item.estado==='CERRADO')
  let arr_open_tickets = another_ticket_list.filter(item=>item.estado==='ABIERTO' && item.asignado!==user)
  let arr_my_tickets = another_ticket_list.filter(item=>item.asignado===user && item.estado !=='CERRADO')

  // Marco si estas viendo esto, me quiero matar, en este momento no sirvo para nada xd?, estoy haciendo lo que puedo, se supone que eso de arriba es para que diferenciar los tickets abiertos de los que estan cerrados, en proceso o eso ps nose, lo estoy intentando :)

  return res.status(200).json({
    body: {arr_all_tickets:arr_all_tickets, arr_close_tickets:arr_close_tickets,arr_open_tickets:arr_open_tickets,arr_my_tickets:arr_my_tickets},
    
  });
});

//ruta para poder asignar el ticket a una persona
router.post('/asign_ticket', async (req, res) => {
const {user,ticket_id} = req.body
await ticket.updateOne({ _id: ticket_id }, { asignado: user, estado:"ABIERTO",start_date:new Date()});
return res.status(200).json({
  body: {
    success: true,
    msg:"El ticket fue asignado con exito"
  },
});
});

//ruta para crear el ticket
router.post('/guardar_ticket', async (req, res) => {
  let {state,fecha,titulo,descripcion,urgencia,ubicacion} = req.body
  let se = new ticket({
    id_ticket: "",
    usuario: state,
    descripcion: descripcion,
    ubicacion: ubicacion,
    start_date: null, // fecha en la que se toma el ticket
    urgencia: urgencia,
    estado: "",
    asignado: "",
    close_date: null, // fecha en la que se cierra el ticket
    titulo: titulo,
    create_date: Date(fecha), // fecha en la que el ususario crea el ticket
  });
  se.save();
  return res.status(200).json({
    body: {
      success: true,
      msg:"El ticket fue creado exitosamente."
    },
  });
});

//ruta para poder mover el ticket a la columna de cerrados
router.post('/cerrar_ticket', async (req,res) => {
  // console.log(req.body)
  let {conclusion,id_} = req.body
  await ticket.updateOne({ _id: id_ }, { conclusion: conclusion, estado:'CERRADO', close_date:new Date() });
  return res.status(200).json({
    body: {
      msg:"El ticket fue cerrado exitosamente",
      success:true
    }
  });
});

//ruta para poder cambiar el estado del ticket a "en proceso"
router.post('/ticket_process', async (req,res) => {
// console.log(req.body);
    let {id_,estado} = req.body
    await ticket.updateOne({_id:id_}, {estado:estado});
    return res.status(200).json({
      body:{
        msg:"El ticket fue modificado exitosamente",
        success:true
      }
    })
});

//ruta para que funcione el filtro
router.post('/ticket_filtro', async (req,res) => {
  let {tecnico, passTecnico} = req.body
  
 let login_ = await Tecnico.findOne({"email":tecnico, "password":passTecnico})
  console.log(login_);
  if (login_) {
    return res.status(200).json({
      body:{
        user:login_.email,
        success:true
      }
    })
  }else{
    return res.status(200).json({
      body:{
        user:null,
        success:false
      }
    })

  }
  
});

module.exports = router;
