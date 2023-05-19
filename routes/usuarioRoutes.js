import express from "express";
import {
   formConfirm,
   formularioLogin,
   formularioRecoverPas,
   formularioSignUp,
   register,
   resetPassword,
} from "../controllers/usuarioController.js";

export const router = express.Router();

router.get("/login", formularioLogin);
router.get("/register", formularioSignUp);
router.post("/register", register);
router.get("/confirmar-cuenta/:token", formConfirm);

router.get("/recover", formularioRecoverPas);
router.post("/recover", resetPassword);

