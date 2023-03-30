let router = require('express').Router()
let { verMisProductos, agregar } = require('../controllers/compra')

router.get('/', verMisProductos)
router.post('/', agregar)

module.exports = router