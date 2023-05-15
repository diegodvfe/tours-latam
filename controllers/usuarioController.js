import {
   check,
   validationResult,
} from "express-validator";
import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) => {
   res.render("auth/login", {
      pagina: "Login",
   });
};

const formularioSignUp = (req, res) => {
   res.render("auth/register", {
      pagina: "Create acount",
   });
};

const register = async (req, res) => {
   // validacion
   await check("nombre").notEmpty().run(req);

   let resultado = validationResult(req);
   res.json(resultado.array());

   const usuario = await Usuario.create(req.body);
   res.json(usuario);
};

const formularioRecoverPas = (req, res) => {
   res.render("auth/recoverpas", {
      pagina: "Recover password",
   });
};

export {
   formularioLogin,
   formularioSignUp,
   formularioRecoverPas,
   register,
};
