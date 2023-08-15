const router = require('express').Router()
const schemaSignUp = require('../schemas/usuarioSignUp')
const validator = require('../middlewares/validator')
let { registrar, verificar, ingresar, ingresar_token, cerrar_sesion } = require('../controllers/usuario')
const accountExistsUp = require('../middlewares/accountExistsSignUp')
const accountExistsSignIn = require('../middlewares/accountExistsSignIn')
const accountHasBeenVerified = require('../middlewares/accountHasBeenVerified')
const mustSignIn = require('../middlewares/mustSignIn')
const passport = require('../config/passport')


router.post('/sign-up', validator(schemaSignUp), accountExistsUp, registrar)
router.post('/sign-in', accountExistsSignIn, accountHasBeenVerified, ingresar)
router.get('/verificar/:codigo', verificar)
router.post('/token', passport.authenticate('jwt', { session: false }), mustSignIn, ingresar_token)
router.put('/sign-out', passport.authenticate('jwt', { session: false }), cerrar_sesion)

module.exports = router