let router = require('express').Router()
let { create, read, update, destroy } = require('../controllers/producto')

let schema = require('../schemas/producto')
let validator = require('../middlewares/validator')

router.post('/', validator(schema), create)
router.get('/', read)
router.delete('/:id', destroy)
router.put('/:id', update)

module.exports = router