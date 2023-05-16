
import {DataTypes} from 'sequelize'
import { db } from '../config/db.js'
import bycrypt from 'bcrypt'

 const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN
},{
    hooks: {
        beforeCreate: async (usuario) =>{
            const salt = await bycrypt.genSalt(10)
            usuario.password = await bycrypt.hash(usuario.password, salt)
        }
    }
})

export default Usuario