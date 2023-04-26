import passport from "passport";
import { checkAuthentication } from "../config/passport_config.js";
import { upload } from "../config/multer_config.js";
import SessionFactory from "../factory/session_factory.js";

const session_factory_DAO = SessionFactory.getDAO();

export const Login_Render_controller = (req, res) => {
  res.render("login");
};

export const Login_Authenticate_controller = (req, res) => {
  passport.authenticate("login", {
    failureRedirect: "/session/faillogin",
  }),
    () => {
      const user = req.user;
      req.session.user = user;
      res.redirect("/");
    };
};

export const Register_Render_controller = (req, res) => {
  res.render("register");
};

export const Register_Authenticate_controller = (req, res) => {
  upload.single("image"),
    passport.authenticate("register", {
      failureRedirect: "/session/failregister",
    }),
    () => {
      req.session.destroy((error) => {
        if (error) {
          logger.error(`Error al destruir la session ${error}`);
          return;
        }
      });
      res.redirect("/session/login");
    };
};

export const Login_Fail_controller = (req, res) => {
  res.render("failLogin");
};

export const Register_Fail_controller = (req, res) => {
  res.render("failRegister");
};

export const Logout_controller = (req, res) => {
  checkAuthentication(req, res, () => {
    const user = req.session.user;
    req.session.destroy((error) => {
      if (error) {
        logger.error(`Error al destruir la session ${error}`);
        return;
      } else {
        res.render("logout", { user });
      }
    });
    //SE DESCONECTA LA BASE DE DATOS
    session_factory_DAO.MongoDB_Disconnect(); //LLAMAR AL REPOSITORY DE CONNECTION EN DONDE VA A ESTAR LA CLASE ConnectionDaoMongoDB
  });
};

export const FindUser_controller = async (email) => {
  await session_factory_DAO.MongoDB_Connect(); //LLAMAR AL REPOSITORY DE CONNECTION EN DONDE VA A ESTAR LA CLASE ConnectionDaoMongoDB
  const user_controller = await session_factory_DAO.FindUser(email);
  return user_controller;
};

export const SaveUser_controller = async (newUser) => {
  await session_factory_DAO.SaveUser(newUser);
};
