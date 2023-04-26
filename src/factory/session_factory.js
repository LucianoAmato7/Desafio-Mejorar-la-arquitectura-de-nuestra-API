import UserDaoMongoDB from "../DAO/session_DAO";
import { database_type } from "../config/dotenv_config.js"

class SessionFactory {
    constructor() {
      this.sessionDAO = null;
    }
  
    getDAO() {
      switch(database_type) {
        case "MONGO":
          this.sessionDAO = new UserDaoMongoDB();
          break;
        default:
          throw new Error("No se ha definido un tipo de base de datos");
          break;
      }
      return this.sessionDAO;
    }
}
  
module.exports = new SessionFactory();