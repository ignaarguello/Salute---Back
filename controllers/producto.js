const Producto = require('../models/Producto')

const controller = {
    create: async (req, res) => {
        try {
            let nuevoProducto = await Producto.create(req.body)
            res.status(201).json({
                id: nuevoProducto._id,
                success: true,
                message: "Producto creado con éxito!",
                body: nuevoProducto,
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    read: async (req, res) => {
        let query = {}
        let order = {}

        if (req.query.nombre) {
            query = {
                ...query,
                nombre: { $regex: req.query.nombre, $options: "i" }
            }
        }

        if (req.query.tipo) {
            query = {
                ...query,
                tipo: req.query.tipo
            }
        }

        if (req.query.order) {
            order = {
                precio: req.query.order
            }
        }

        try {
            let todosProductos = await Producto.find(query).sort(order)
            if (todosProductos) {
                res.status(200).json({
                    response: todosProductos,
                    success: true,
                    message: 'Productos encontrados!'
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No se encontraron productos.'
                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    update: async (req, res) => {
        let { id } = req.params

        try {
            let unProducto = await Producto.findOneAndUpdate({ _id: id }, req.body, { new: true })
            if (unProducto) {
                res.status(200).json({
                    data: unProducto,
                    success: true,
                    message: `'${unProducto.nombre}' se actualizó correctamente.`
                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    destroy: async (req, res) => {
        let { id } = req.params

        try {
            let unProducto = await Producto.findOneAndDelete({ _id: id })
            if (unProducto) {
                res.status(200).json({
                    success: true,
                    message: `'${unProducto.nombre}' se eliminó correctamente.`,
                    data: unProducto
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "no encontro"
                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
}

module.exports = controller