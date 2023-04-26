import MsjDaoMongoDB from "../DAO/mensajes_DAO.js";
import { database_type } from "../config/dotenv_config.js"

class MensajesFactory {
    constructor() {
      this.mensajesDAO = null;
    }
  
    getDAO() {
      switch(database_type) {
        case "MONGO":
          this.mensajesDAO = new MsjDaoMongoDB();
          break;
        default:
          throw new Error("No se ha definido un tipo de base de datos");
          break;
      }
      return this.mensajesDAO;
    }
}
  
module.exports = new MensajesFactory();