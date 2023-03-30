const passport = require('passport')
const passportJwt = require('passport-jwt')

const {KEY_JWT} = process.env

const Usuario = require('../models/Usuario')

passport.use(
    new passportJwt.Strategy(
        {
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: KEY_JWT
        },
        async (jwt_payload,done) => {
            try {
                let user = await Usuario.findOne({_id:jwt_payload.id})
                if (user) {
                    user = {
                        id: user._id,
                        nombe: user.nombre,
                        email: user.email,
                        rol: user.rol,
                    }
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                console.log(error)
                return done(error,false)
            }
        }
    )
)

module.exports = passport