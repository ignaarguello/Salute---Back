const Compra = require('../models/Compra')

const controller = {
    verMisProductos: async (req, res) => {
        // console.log('--------REQ-------',req);
        // console.log('--------RES-------',res);
        let query = {}
        if (req.query.usuario){
            query = {
                usuario: req.query.usuario
            }
        }

        try{
            let todasMisCompras = await Compra.find(query)
            .populate({path: 'productos', select: 'nombre imagen precio tipo'})
            .populate({path: 'usuario', select: 'nombre apellido foto email'})

            if(todasMisCompras.length > 0){
                res.status(200).json({
                    data: todasMisCompras,
                    success: true,
                    message: "Se encontraron artículos en el carrito!"
                })
            } else{
                res.status(404).json({
                    success: false,
                    message: "No tiene ningún articulo agregado al carrito."
                })
            }
        } catch(error){
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    },

    agregar: async (req,res) =>{
        let query = {}

        if(req.query.usuario){
            query = {usuario: req.query.usuario}
        }

        try{
            let tieneCompras = await Compra.find(query)
            if (tieneCompras.length > 0){
                res.status(200).json({
                    success: false,

                })
            } else {
                console.log("no hoals");
            }

        } catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    quitar: async (req, res) => {

    },

    finalizar: async (req, res) => {

    },
}

module.exports = controller