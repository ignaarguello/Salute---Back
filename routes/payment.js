let router = require('express').Router()
const PaymentController = require('../controllers/PaymentController')
const PaymentService = require('../services/PaymentService')
const PaymentInstance = new PaymentController( new PaymentService())

router.post('/', function(req, res, next) {
  // console.log("REQ ->",req.body);
  PaymentInstance.getPaymentLink(req,res)
})

module.exports = router