const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    nombre: {type: String, require: true},
    apellido: {type: String, require: true},
    foto: {type: String, require: true},
    rol: {type: String, require: true},
    nacimiento: {type: Date, require: true},
    email: {type: String, require: true},
    contraseña: {type: String, require: true},
    verificado: {type: Boolean},
    logeado: {type: Boolean},
    codigo: {type: String, require: true}
})

const Usuario = mongoose.model('usuarios', schema)

module.exports = Usuario