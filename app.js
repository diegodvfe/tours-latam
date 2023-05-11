// const express = require('express') // 
import express from 'express'
import { router } from './routes/usuarioRoutes.js';

const app = express()

// Routing
app.use('/auth', router)

// habilitar pug

app.set('view engine', 'pug')
app.set('views', './views')

// carpeta publica
app.use(express.static('public')) 


// Definir u puerto 

const port = 3004
app.listen(port, () =>{
    console.log( `El servidor esta funcionando ${port}`);
})


