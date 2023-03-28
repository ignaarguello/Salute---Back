const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    usuario: {type: mongoose.Types.ObjectId, ref: 'usuarios', required: true},
    productos: [{type: mongoose.Types.ObjectId, ref: 'productos', required: true}],
})

const Compra = mongoose.model('compras', schema)

module.exports = Compra