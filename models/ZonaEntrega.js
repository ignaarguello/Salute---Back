const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
})

const ZonaEntrega = mongoose.model('zonasEntregas', schema)

module.exports = ZonaEntrega