let router = require('express').Router()
let { agregarAlCarrito, traerProductosCarrito, editarProductoCarrito, eliminarDelCarrito, eliminarComprasUsuario } = require('../controllers/carrito')

router.post('/', agregarAlCarrito)
router.get('/', traerProductosCarrito)
router.put('/:productoId', editarProductoCarrito)
router.delete('/:productoId', eliminarDelCarrito)

module.exports = router