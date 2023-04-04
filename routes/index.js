let router = require('express').Router()
let producto = require('./producto')
let usuario = require('./usuarios')
let zonaEntrega = require('./zonas')
// let compras = require('./compras')
let carrito = require('./carrito')
let payment = require('./payment')

router.use('/productos', producto)
router.use('/usuarios', usuario)
router.use('/zonas', zonaEntrega)
// router.use('/compras', compras)
router.use('/carrito', carrito)
router.use('/payment', payment)

module.exports = router;
