const { verifyResponse } = require('../config/responses')

function accountHasBeenVerified(req, res, next) {
    if (req.user.verificado) {
        return next()
    }
    verifyResponse(req,res)
}

module.exports =  accountHasBeenVerified 