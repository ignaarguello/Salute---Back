const router = require('express').Router()
const { create } = require('../controllers/PaymentController')

router.post('/', create)

module.exports = router