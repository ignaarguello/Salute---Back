const router = require('express').Router()
const schemaSignUp = require('../schemas/usuarioSignUp')
const validator = require('../middlewares/validator')
let { registrar, verificar, ingresar  } = require('../controllers/usuario')
const accountExistsUp = require('../middlewares/accountExistsSignUp')
const accountExistsSignIn = require('../middlewares/accountExistsSignIn')
const accountHasBeenVerified = require('../middlewares/accountHasBeenVerified')


router.post('/sign-up', validator(schemaSignUp), accountExistsUp, registrar)
router.post('/sign-in', accountExistsSignIn, accountHasBeenVerified, ingresar)
router.get('/verificar/:codigo', verificar)

module.exports = router