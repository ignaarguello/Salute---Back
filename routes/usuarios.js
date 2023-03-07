const router = require('express').Router()
const schemaSignUp = require('../schemas/usuarioSignUp')
const validator = require('../middlewares/validator')
let {registrar} = require('../controllers/usuario')
const accountExistsUp = require('../middlewares/accountExistsSignUp')


router.post('/sign-up', validator(schemaSignUp), accountExistsUp, registrar)

module.exports = router