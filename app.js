// const express = require('express') // 
import express from 'express'
import { router } from './routes/usuarioRoutes.js';
import { db } from './config/db.js';

// crando la app
const app = express()

// Conexion a la base de datos
try {
    await db.authenticate();
    console.log('Conexion correcta a la base de datos')
} catch (error) {           
    console.log(error);
}

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


