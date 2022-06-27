const mongoose = require('mongoose');

const AnunciosSchema = mongoose.Schema({
    imagen: {
        type: String,
    },
    imagenes: {
        type: Array
    },
    nombre: {
        type: String,
        required: true
    },
    moneda: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String
    },
    amenidades: {
        type: Array
    },
    usuarios: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    }
});



module.exports = mongoose.model('anuncios', AnunciosSchema);