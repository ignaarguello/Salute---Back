let router = require('express').Router()
let producto = require('./producto')

router.use('/productos', producto)

module.exports = router;
