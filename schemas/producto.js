const joi = require('joi')

const schema = joi.object({
    nombre: joi
        .string()
        .required()
        .min(4)
        .messages({
            "any.required": "Necesita un nombre",
            "string.empty": "El campo 'Nombre' tiene que ser llenado",
            "string.base": "El nombre debe tener letras no solo simbolos o numeros",
            "string.min": "El nombre debe tener más de 4 letras"
        }),
    tipo: joi
        .string()
        .required()
        .min(4)
        .messages({
            "any.required": "Necesita un tipo de bebida",
            "string.empty": "El campo 'Tipo' tiene que ser llenado",
            "string.base": "El tipo de bebida debe ser una palabra",
            "string.min": "El tipo de bebida debe tener más de 4 letras"
        }),
    precio: joi
        .number()
        .required()
        .messages({
            "any.required": "Necesita un precio",
            "number.empty": "El campo 'Precio' tiene que ser llenado",
            "number.base": "El precio debe ser un número",
        }),
    imagen: joi
        .string()
        .required()
        .uri()
        .messages({
            "any.required": "La imagen es obligatoria",
            "string.empty": "El campo 'imagen' no puede estar vacío",
            "string.uri": "La imagen debe ser una URL válida",
        })
})

module.exports = schema