import express from "express";
import { formularioLogin, formularioRecoverPas, formularioSignUp, register,  } from "../controllers/usuarioController.js";

export const router = express.Router()

router.get('/login', formularioLogin)
router.get('/register', formularioSignUp )
router.post('/register', register)
router.get('/recover', formularioRecoverPas)





