const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    nombre: {type: String, required: true},
    imagen: {type: String, required: true},
    cantidad: {type: Number, required: true},
    precio: {type: Number, required: true},
    usuarioId: {type: mongoose.Types.ObjectId, ref: 'usuarios', required: true},
    productoId: {type: mongoose.Types.ObjectId, ref: 'productos', required: true},
})

const Carrito = mongoose.model('Carrito', schema)
module.exports = Carrito