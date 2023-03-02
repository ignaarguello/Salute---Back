let admins = [
    {
        nombre: "Fabrizio",
        apellido: "Catanzaro",
        foto: "https://s1.eestatic.com/2018/10/29/cultura/series/series_349227288_103600829_1706x1280.jpg",
        rol: "admin",
        nacimiento: new Date('11/07/2000'),
        email: 'fabriziocatanzaro1@gmail.com',
        contraseña: 'probando1234',
        verificado: true,
        logeado: true,
        codigo: "ff18122022aa"
    }
]

require('dotenv').config()
require('../../config/database')

const Usuario = require('../Usuario')

admins.forEach( (element) => {
    Usuario.create({
        nombre: element.nombre,
        apellido: element.apellido,
        foto: element.foto,
        rol: element.rol,
        nacimiento: element.nacimiento,
        email: element.email,
        contraseña: element.contraseña,
        verificado: element.verificado,
        logeado: element.logeado,
        codigo: element.codigo
    })
})

module.exports = Usuario