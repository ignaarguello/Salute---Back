let zonasEntregas = [
    {
        nombre: 'Zona Roja',
        precio: 200
    },
    {
        nombre: 'Zona Verde',
        precio: 250
    },
    {
        nombre: 'Zona Azul',
        precio: 0
    }
]

require('dotenv').config()
require('../../config/database')

const ZonaEntrega = require('../ZonaEntrega')

zonasEntregas.forEach(elemento => {
    ZonaEntrega.create({
        nombre: elemento.nombre,
        precio: elemento.precio
    })
})