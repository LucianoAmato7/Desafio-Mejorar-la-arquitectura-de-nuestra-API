import ProductsDaoMongoDB from "../DAO/productos_DAO.js";
import { database_type } from "../config/dotenv_config.js"

class ProductosFactory {
    constructor() {
      this.productosDAO = null;
    }
  
    getDAO() {
      switch(database_type) {
        case "MONGO":
          this.productosDAO = new ProductsDaoMongoDB();
          break;
        default:
          throw new Error("No se ha definido un tipo de base de datos");
          break;
      }
      return this.productosDAO;
    }
}
  
module.exports = new ProductosFactory();