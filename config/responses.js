function userExistsResponse(req,res) {
    return res.status(400).json({
        success: false,
        message: 'El usuario ya existe.'
    })
}

function userSignedUpResponse(req,res) {
    return res.status(201).json({
        success: true,
        message: 'Usuario registrado!'
    })
}

function userSignedOutResponse(req,res) {
    return res.status(201).json({
        success: true,
        message: 'Usuario deslogeado.'
    })
}

function userNotFoundResponse(req,res) {
    return res.status(404).json({
        success: false,
        message: 'usuario no encontrado.'
    })
}

function mustSignInResponse(req,res) {
    return res.status(400).json({
        success: false,
        message: 'Inicia sesión por favor.'
    })
}

function invalidCredentialsResponse(req,res) {
    return res.status(401).json({
        success: false,
        message: 'Contraseña o email incorrecto.'
    })
}

function verifyResponse(req,res) {
    return res.status(401).json({
        success: false,
        message: 'Por favor, verifique su correo y vuelva a intentar.'
    })
}

/* function unableToDeleteReactions(req,res){
    return res.status(401).json({
        success: false,
        message: 'You are unauthorized to delete his / her reactions',
    })
} */
/* function mustBeTheOwner(req, res) {
    return res.status(401).json({
        success: false,
        message: "You must be the owner to carry out this operation",
    });
} */

/* function activityNotFound(req, res) {
    return res.status(404).json({
        success: false,
        message: "Couldn't find the activity",
    });
} */

module.exports = {
    userSignedUpResponse,
    userExistsResponse,
    userNotFoundResponse,
    userSignedOutResponse,
    mustSignInResponse,
    invalidCredentialsResponse,
    verifyResponse,
/*     unableToDeleteReactions,
    mustBeTheOwner,
    activityNotFound, */
}