let productos = [
    {
        nombre: 'Fernet Branca 750ml',
        tipo: 'Aperitivo',
        precio: 1900,
        imagen: ''
    },
    {
        nombre: 'Andes Roja 473cc (lata)',
        tipo: 'Cerveza',
        precio: 500,
        imagen: ''
    },
    {
        nombre: 'Cosecha especial Extra Brut de Norton',
        tipo: 'Espumante',
        precio: 3200,
        imagen: ''
    },
]

const Producto = require('../Producto')

productos.forEach(elemento => {
    Producto.create({
        nombre: elemento.nombre,
        tipo: elemento.tipo,
        precio: elemento.precio,
        imagen: elemento.imagen,
    })
})