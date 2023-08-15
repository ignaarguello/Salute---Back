const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    nombre: {type: String, required: true},
    tipo: {type: String, required: true},
    precio: {type: Number, required: true},
    imagen: {type: String, required: true},
    enCarrito: {type: Boolean, default: false},
    usuarioId: {type: mongoose.Types.ObjectId, ref: 'usuarios'}
})

const Producto = mongoose.model('productos', schema)


module.exports = Producto