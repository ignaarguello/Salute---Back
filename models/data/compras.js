let compras = [
    {
        usuario: '641b9fb423f1de476c35c457',
        productos: ['63fce7947d97c853f5c57cde', '640facae2fc73028f04ec4e7']
    }
]

require('dotenv').config()
require('../../config/database')

const Compra = require('../Compra')

compras.forEach(elemento => {
    Compra.create({
        usuario: elemento.usuario,
        productos: elemento.productos,
    })
})