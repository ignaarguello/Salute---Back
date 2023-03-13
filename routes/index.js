let router = require('express').Router()
let producto = require('./producto')
let usuario = require('./usuarios')

router.use('/productos', producto)
router.use('/usuarios', usuario)

module.exports = router;
