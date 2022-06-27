const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    edad:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    contraseña:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('usuarios', UsuarioSchema);