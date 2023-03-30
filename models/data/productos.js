let productos = [
    {
        nombre: 'Fernet Branca 750ml',
        tipo: 'Aperitivo',
        precio: 1900,
        imagen: 'http://d2r9epyceweg5n.cloudfront.net/stores/001/769/691/products/fernet-branca-1lt_1lt_11-20b4d38d3cead1b0f716267030672745-640-0.jpg',
        enCarrito: false,
        usuarioId: '641b9fb423f1de476c35c457',
    },
    {
        nombre: 'Andes Roja 473cc (lata)',
        tipo: 'Cerveza',
        precio: 500,
        imagen: 'https://s1874.com/as/wp-content/uploads/2020/03/04-cerveza-andes-roja-lata-x-473.jpg',
        enCarrito: false,
        usuarioId: '641b9fb423f1de476c35c457',
    },
    {
        nombre: 'Cosecha especial Extra Brut de Norton',
        tipo: 'Espumante',
        precio: 3200,
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3IED7IA5WU_xqrMhhyM5x2mqBfJh5Uy60Qv-mszWH9sl-MwCI-lkmy7mavJCHcBz8yVg&usqp=CAU',
        enCarrito: false,
        usuarioId: '641b9fb423f1de476c35c457',
    },
]

require('dotenv').config()
require('../../config/database')

const Producto = require('../Producto')

productos.forEach(elemento => {
    Producto.create({
        nombre: elemento.nombre,
        tipo: elemento.tipo,
        precio: elemento.precio,
        imagen: elemento.imagen,
        enCarrito: elemento.enCarrito,
        usuarioId: elemento.usuarioId
    })
})