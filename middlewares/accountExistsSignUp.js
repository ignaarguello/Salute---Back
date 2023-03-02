const Usuario = require('../models/Usuario')
const { userExistsResponse } = require("../config/responses");

async function accountExistsUp(req, res, next) {
    const user = await Usuario.findOne({email: req.body.email})
    if (user) {
        userExistsResponse(req,res)
        return
    }
    return next()
}

module.exports =  accountExistsUp 
