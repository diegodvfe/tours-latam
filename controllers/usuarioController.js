import {
   check,
   validationResult,
} from "express-validator";
import Usuario from "../models/Usuario.js";
import { genarateId } from "../helpers/tokens.js";
import { emailRegister } from "../helpers/email.js";

// Acceso al login
const formularioLogin = (req, res) => {
   res.render("auth/login", {
      pagina: "Login",
   });
};

// Creacion de cuenta

const formularioSignUp = (req, res) => {
   res.render("auth/register", {
      pagina: "Create acount",
   });
};
// validacion de registro
const register = async (req, res) => {
   // validacion
   await check("nombre")
      .notEmpty()
      .withMessage("You need to put a name")
      .run(req);
   await check("email")
      .isEmail()
      .withMessage(
         "We need your email to create an account"
      )
      .run(req);
   await check("password")
      .isLength({ min: 4 })
      .withMessage("We need a strong password")
      .run(req);
   await check("confirm_password")
      .equals(req.body.password)
      .withMessage("The password be the same ")
      .run(req);

   let resultado = validationResult(req);

   // Verificar que el resultado este vacio
   if (!resultado.isEmpty()) {
      // Errores
      return res.render("auth/register", {
         pagina: "Create acount",
         errores: resultado.array(),
         usuario: {
            nombre: req.body.nombre,
            email: req.body.email,
         },
      });
   }

   const { nombre, email, password } = req.body;

   // Verificar no este duplicado
   const existUsuario = await Usuario.findOne({
      where: { email },
   });
   if (existUsuario) {
      return res.render("auth/register", {
         pagina: "Create acount",
         errores: [
            {
               msg: "The user is alredy register",
            },
         ],
         usuario: {
            nombre: nombre,
            email: email,
         },
      });
   }

   // Almacenar un usuario

   const usuario = await Usuario.create({
      nombre,
      email,
      password,
      token: genarateId(),
   });

   // Envia correo de confirmacion
   emailRegister({
      nombre: usuario.nombre,
      email: usuario.email,
      token: usuario.token,
   });

   // const usuario = await Usuario.create(req.body);
   // res.json(usuario);

   // Mostrar mensaje de confirmacion
   res.render("templates/mensaje", {
      pagina: "Your account was correct",
      message:
         "We send you an emial to confirm, please confirm your account",
   });
};

const formularioRecoverPas = (req, res) => {
   res.render("auth/recoverpas", {
      pagina: "Recover password",
   });
};

const formConfirm = async (req, res) => {

   const { token } = req.params

   // Verificando cuenta
   const usuario = await Usuario.findOne({
      where: {token}
   })
   if(!usuario) {
     return res.render("confirmar-cuenta", {
      pagina: "Your account was not successfully confirm",
      message: "Please try another again",
      error: true
     })
   }
   console.log(usuario);
  
};

export {
   formularioLogin,
   formularioSignUp,
   formularioRecoverPas,
   formConfirm,
   register,
};
