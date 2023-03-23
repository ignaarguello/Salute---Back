let router = require('express').Router()
let producto = require('./producto')
let usuario = require('./usuarios')
let zonaEntrega = require('./zonas')

router.use('/productos', producto)
router.use('/usuarios', usuario)
router.use('/zonas', zonaEntrega)

module.exports = router;
