const Usuario = require('../models/Usuario')
const { invalidCredentialsResponse } = require('../config/responses');

async function accountExistsIn(req, res, next) {
    const user = await Usuario.findOne({email: req.body.email})
    if (user) {
        req.user = user
        return next()
    }
    invalidCredentialsResponse(req,res)
}

module.exports =  accountExistsIn 