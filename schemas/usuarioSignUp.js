const joi = require('joi')

const schemaSignUp = joi.object({
    nombre: joi
        .string()
        .required()
        .min(2)
        .max(40)
        .messages({
            "any.required": "El campo 'Nombre' es obligatorio",
            "string.empty": "El campo 'Nombre' no puede estar vacío",
            "string.base": "El nombre debe contener solo letras",
            "string.min": "El nombre debe tener más de 2 letras",
            "string.max": "El nombre debe tener menos de 40 letras"
        }),
    apellido: joi
        .string()
        .required()
        .min(2)
        .max(30)
        .messages({
            "any.required": "El campo 'apellido' es obligatorio",
            "string.empty": "El campo 'apellido' no puede estar vacío",
            "string.base": "El apellido debe contener solo letras",
            "string.min": "El apellido debe tener más de 2 letras",
            "string.max": "El apellido debe tener menos de 40 letras",
        }),
    foto: joi
        .string()
        .required()
        .uri()
        .messages({
            "any.required": "El campo 'foto' es obligatorio",
            "string.empty": "La foto no puede estar vacía",
            "string.uri": "La foto debe ser un link válido",
        }),
    email: joi
        .string()
        .required()
        .email({ minDomainSegments:2 })
        .messages({
            "any.required": "El campo 'email' es obligatorio",
            "string.empty": "Email no puede estar vacío",
            "string.base": "Email debe ser un mail válido",
        }),
    contraseña: joi
        .string()
        .required()
        .min(6)
        .max(16)
        .trim()
        .messages({
            "any.required": "El campo 'contraseña' es obligatorio",
            "string.empty": "El campo 'contraseña' no puede estar vacío",
            "string.min": "La contraseña debe tener más de 6 caracteres",
            "string.max": "La contraseña debe tener menos de 16 caracteres",
            "string.trim": "Password cannot contain spaces",
        }),
})

module.exports = schemaSignUp