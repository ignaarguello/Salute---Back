const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const accountVerificationEmail = require('./accountVerificationEmail')
const { userSignedUpResponse, userNotFoundResponse, invalidCredentialsResponse } = require('../config/responses')
const jwt = require('jsonwebtoken')

const controller = {
    registrar: async (req, res, next) => {
        let { nombre, apellido, foto, rol, nacimiento, email, contraseña } = req.body
        let verificado = false
        let logeado = false
        let codigo = crypto.randomBytes(10).toString('hex')
        contraseña = bcryptjs.hashSync(contraseña, 10)

        try {
            await Usuario.create({ nombre, apellido, foto, rol, nacimiento, email, contraseña, verificado, logeado, codigo })
            await accountVerificationEmail(email, codigo, nombre)
            return userSignedUpResponse(req, res)
        } catch (error) {
            next(error)
        }
    },

    verificar: async (req, res, next) => {
        const { codigo } = req.params
        console.log(codigo)
        try {
            let user = await Usuario.findOneAndUpdate({ codigo: codigo }, { verificado: true }, { new: true })
            if (user) {
                return res.redirect('https://salute-front.vercel.app/')
            }
            return userNotFoundResponse(req, res)
        } catch (error) {
            next(error)
        }
    },

    ingresar: async (req, res, next) => {
        const { contraseña } = req.body;
        const { user } = req;

        try {
            const validarContraseña = bcryptjs.compareSync(contraseña, user.contraseña)

            if (validarContraseña) {
                const userBD = await Usuario.findOneAndUpdate({ _id: user.id }, { logeado: true })
                const token = jwt.sign(
                    { id: userBD._id, nombre: userBD.nombre, apellido: userBD.apellido, foto: userBD.foto, loggeado: userBD.loggeado },
                    process.env.KEY_JWT,
                    { expiresIn: 60 * 60 * 24 }
                )
                res.status(200).json({
                    response: { token },
                    successs: true,
                    message: `Bienvenido ${user.nombre}`
                })
            }

            return invalidCredentialsResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
}

module.exports = controller