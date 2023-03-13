const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const accountVerificationEmail = require('./accountVerificationEmail')
const {userSignedUpResponse} = require('../config/responses')

const controller = {
    registrar: async(req,res,next) => {
        let {nombre, apellido, foto, rol, nacimiento, email, contraseña} = req.body
        let verificado = false
        let logeado = false
        let codigo = crypto.randomBytes(10).toString('hex')
        contraseña = bcryptjs.hashSync(contraseña, 10)

        try{
            await Usuario.create({nombre, apellido, foto, rol, nacimiento, email, contraseña, verificado, logeado, codigo})
            await accountVerificationEmail(email, codigo, nombre)
            return userSignedUpResponse(req, res)
        } catch(error){
            next(error)
        }
    }
}

module.exports = controller