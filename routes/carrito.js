let router = require('express').Router()
let { agregarAlCarrito, traerProductosCarrito, editarProductoCarrito } = require('../controllers/carrito')

router.post('/', agregarAlCarrito)
router.get('/', traerProductosCarrito)
router.put('/:id', editarProductoCarrito)

module.exports = router