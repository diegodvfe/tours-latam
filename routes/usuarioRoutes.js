import express from "express";
import { formularioLogin, formularioSignUp,  } from "../controllers/usuarioController.js";

export const router = express.Router()

router.get('/login', formularioLogin)
router.get('/signup', formularioSignUp )





