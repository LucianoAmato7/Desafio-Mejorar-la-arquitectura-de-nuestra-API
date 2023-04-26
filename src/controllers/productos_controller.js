import ProductosFactory from "../factory/productos_factory.js";

const productos_factory_DAO = ProductosFactory.getDAO();

export const GetProds_controller = async (req, res) => {
  const productos = await productos_factory_DAO.GetProds();
  res.json(productos);
};
