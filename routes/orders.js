const router = require('express').Router()
const { delete_orders_users } = require('../controllers/orders_user')


router.delete('/:usuarioId', delete_orders_users)

module.exports = router
