const Carrito = require('../models/Carrito')
const Producto = require('../models/Producto')

const controller = {
    agregarAlCarrito: async (req, res) => {
        const { nombre, imagen, precio, usuarioId, productoId } = req.body
        const esProducto = await Producto.findOne({ nombre })
        const noEstaVacio = (nombre !== '') && (imagen !== '') && (precio !== '') && (usuarioId !== '') && (productoId !== '')
        const estaEnCarrito = await Carrito.findOne({ nombre, usuarioId })

        if (!esProducto){
            res.status(400).json({
                success: false,
                message: 'El producto no se encuentra en nuestra base de datos.'
            })
        } else if( noEstaVacio && !estaEnCarrito){
            const nuevoProdEnCarrito = new Carrito({ nombre, imagen, precio, cantidad: 1, usuarioId, productoId })

            let producto = await Producto.findById(esProducto._id)

            await Producto.findByIdAndUpdate(esProducto?._id, {enCarrito: true, nombre, imagen, precio}, {new: true})
                .then( (producto) =>{
                    nuevoProdEnCarrito.save()
                    res.json({
                        success: true,
                        message: 'El producto se agregó al carrito.',
                        data: producto
                    })
                })
                .catch( (error) => {
                    console.error(error);
                })
        } else if(estaEnCarrito){
            res.status(400).json({
                success: false,
                message: 'Ya esta en el carrito',
            })
        }
    },

    traerProductosCarrito: async(req, res) => {
        let query = {}
        if (req.query.usuarioId){
            query = { usuarioId: req.query.usuarioId}
        }
        const productosEnCarrito = await Carrito.find(query)
        if (productosEnCarrito.length > 0){
            res.status(200).json({
                success: true,
                data: productosEnCarrito
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'No hay productos en el carrito'
            })
        }
    },

    editarProductoCarrito: async(req, res) => {
        const { id } = req.params
        console.log(id);
        const {query} = req.query
        const body = req.body
        
        let producto = await Producto.findById(body.productoId)
        const productoEnviado = await Carrito.findById(id)

        if(!query){
            res.status(404).json({
                success: false,
                message: "Debes enviar una query"
            })
        } else if( productoEnviado && query === "agregar"){
            body.cantidad = body.amount + 1

            await Carrito.findByIdAndUpdate(id, body, {new: true})
                .then( (prod) => {
                    res.status(200).json({
                        success: true,
                        message: 'Se agrego un producto',
                        data: prod
                    })
                })
        } else if( productoEnviado && query === "eliminar"){
            body.amount = body.amount - 1

            await Carrito.findByIdAndUpdate(id, body, {new: true})
            .then( (prod) => {
                res.status(200).json({
                    success: true,
                    message: 'Se sacó un producto',
                    data: prod
                })
            })
        } else {
            res.status(400).json({
                success: false,
                message: "ocurrio un error"
            })
        }
    },
}

module.exports = controller