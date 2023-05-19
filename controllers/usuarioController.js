import {
   check,
   validationResult,
} from "express-validator";
import Usuario from "../models/Usuario.js";
import { genarateId } from "../helpers/tokens.js";
import { emailRegister } from "../helpers/email.js";
// import { csrf } from 'csurf';

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
      csrfToken: req.csrfToken()
      
      // CSrf
      // csrfToken: req.csrfToken()
   });
   console.log(req.csrfToken())
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
         csrfToken: req.csrfToken(),
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
         csrfToken: req.csrfToken(),
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
// Recuperar contraseña
const formularioRecoverPas = (req, res) => {
   res.render("auth/recoverpas", {
      pagina: "Recover password",
      csrfToken: req.csrfToken(),
   });
};

// Resetera password
const resetPassword = async (req, res) => {
    // validacion
   await check("email")
      .isEmail()
      .withMessage(
         "We need your email to send your key"
      )
      .run(req);
  
   let resultado = validationResult(req);

   // Verificar que el resultado este vacio
   if (!resultado.isEmpty()) {
      // Errores
      return res.render("auth/recoverpas", {
         pagina: "Recover your password",
         csrfToken: req.csrfToken(),
         errores: resultado.array()
      });
   }
   
}

const formConfirm = async (req, res) => {

   const { token } = req.params

   // Verificando cuenta
   const usuario = await Usuario.findOne({
      where: {token}
   })
   if(!usuario) {
     return res.render("auth/confirmar-cuenta", {
      pagina: "Your account was not successfully confirm",
      message: "Please try another again",
      error: true
     })
   }
   console.log(usuario);

   // Confirmacion de la cuenta

   usuario.token = null
   usuario.confirmando = true

   await usuario.save()

   res.render("auth/cuenta-confirmada", {
      pagina:
         "Account confirm",
      message: "Your account was confirm"
   });


  
};

export {
   formularioLogin,
   formularioSignUp,
   formularioRecoverPas,
   formConfirm,
   register,
   resetPassword
};
