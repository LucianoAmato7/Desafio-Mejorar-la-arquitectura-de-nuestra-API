import MensajesFactory from "../factory/mensajes_fatory.js";

const mensajes_factory_DAO = MensajesFactory.getDAO();

export const ListarMsjs_controller = async (req, res) => {
  const mensajes = await mensajes_factory_DAO.ListarMsjs();
  socket.emit("mensajes", mensajes);
  res.json(mensajes);
};

export const guardarMsj_controller = async (req, res) => {
  const data = req.body;
  const mensaje = await mensajes_factory_DAO.guardarMsj(data);
  res.json(mensaje);
};
