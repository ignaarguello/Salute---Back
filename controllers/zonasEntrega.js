const ZonaEntrega = require('../models/ZonaEntrega')

const controller = {
    create: async(req, res) => {
        try{
            let nuevaZona = await ZonaEntrega.create(req.body)
            res.status(201).json({
                id: nuevaZona._id,
                success: true,
                message: 'Zona creada con éxito!',
                body: nuevaZona
            })
        } catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    read: async(req, res) => {
        let query = {}
        let order = {}

        if (req.query.nombre){
            query = {
                ...query,
                nombre: { $regex: req.query.nombre, $options: "i"}
            }
        }

        if (req.query.order){
            order = {
                precio: req.query.order
            }
        }

        try{
            let todasZonas = await ZonaEntrega.find(query).sort(order)
            if (todasZonas){
                res.status(200).json({
                    response: todasZonas,
                    success: true,
                    message: 'Zonas encontradas'
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No se encontraron zonas.'
                })
            }
        } catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    update: async(req, res) => {
        let { id } = req.params

        try{
            let unaZona = await ZonaEntrega.findOneAndUpdate({ _id: id}, req.body, {new: true}) 
            if (unaZona){
                res.status(200).json({
                    response: unaZona,
                    success: true,
                    message: `${unaZona.nombre} se actualizó con éxito.`
                })
            } else{
                res.status(404).json({
                    success: false,
                    message: 'No se encontró la zona.'
                })
            }
        } catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    destroy: async(req, res) => {
        let {id} = req.params

        try{
            let unaZona = await ZonaEntrega.findOneAndDelete({ _id: id })
            if(unaZona){
                res.status(200).json({
                    success: true,
                    message: `${unaZona.nombre} se eliminó con éxito.`,
                    data: unaZona
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No se encontró la zona.'
                })
            }
        } catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
}

module.exports = controller