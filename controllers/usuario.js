const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const accountVerificationEmail = require('./accountVerificationEmail')
const { userSignedUpResponse, userNotFoundResponse, invalidCredentialsResponse, userSignedOutResponse } = require('../config/responses')
const jwt = require('jsonwebtoken')

const controller = {
    registrar: async (req, res, next) => {
        let { nombre, apellido, foto, email, contraseña } = req.body
        let rol = 'usuario'
        let verificado = false
        let logeado = false
        let codigo = crypto.randomBytes(10).toString('hex')
        contraseña = bcryptjs.hashSync(contraseña, 10)

        try {
            await Usuario.create({ nombre, apellido, foto, rol, email, contraseña, verificado, logeado, codigo })
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

        console.log(req)

        try {
            const validarContraseña = bcryptjs.compareSync(contraseña, user.contraseña)

            if (validarContraseña) {
                await Usuario.findOneAndUpdate({ _id: user.id }, { logeado: true })
                const token = jwt.sign(
                    { id: user._id, nombre: user.nombre, apellido: user.apellido, foto: user.foto, rol:user.rol, logeado: user.logeado },
                    process.env.KEY_JWT,
                    { expiresIn: 60 * 60 * 24 }
                )
                res.json({
                    response: { token, user },
                    successs: true,
                    message: `Bienvenido ${user.nombre}`
                })
            }

            return invalidCredentialsResponse(req, res)
        } catch (error) {
            next(error)
        }
    },

    ingresar_token: async (req, res, next) => {
        let { user } = req

        try {
            return  res.status(200).json({
                response: {
                    user: user,
                    success: true,
                    message: 'Bienvenido' + user.nombre
                }
            })
        } catch (error) {
            next(error)
        }
    },

    cerrar_sesion: async (req, res, next) => {
        const { id } = req.user

        try {
            await Usuario.findOneAndUpdate({ _id: id }, { logeado: false }, { new: true })
            return userSignedOutResponse(req, res)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = controller