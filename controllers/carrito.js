const Carrito = require('../models/Carrito')
const Producto = require('../models/Producto')

const controller = {
    agregarAlCarrito: async (req, res) => {
        const { nombre, imagen, precio, usuarioId, tipo, productoId } = req.body
        const esProducto = await Producto.findOne({ nombre })
        const noEstaVacio = (nombre !== '') && (imagen !== '') && (precio !== '') && (usuarioId !== '') && (productoId !== '')
        const estaEnCarrito = await Carrito.findOne({ nombre, usuarioId })

        if (!esProducto){
            res.status(400).json({
                success: false,
                message: 'El producto no se encuentra en nuestra base de datos.'
            })
        } else if( noEstaVacio && !estaEnCarrito){
            const nuevoProdEnCarrito = new Carrito({ nombre, imagen, precio, tipo, cantidad: 1, usuarioId, productoId })

            let producto = await Producto.findById(esProducto._id)

            await Producto.findByIdAndUpdate(esProducto?._id, {enCarrito: true, nombre, imagen, precio, tipo}, {new: true})
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
        const {productoId} = req.params
        const {query, usuarioId } = req.query
        
        const productoEnviado = await Carrito.findOne({ productoId: productoId})
        // const miCarrito = await Carrito.find({usuarioId: usuarioId})
        // console.log(miCarrito);
        // console.log(usuarioId);
        // console.log(productoEnviado);
        if(!query){
            res.status(404).json({
                success: false,
                message: "Debes enviar una query"
            })
        } else if( productoEnviado && query === "incrementar"){
            let incrementando = productoEnviado.cantidad += 1
            // console.log(incrementando);
            await Carrito.findOneAndUpdate({productoId: productoId}, {cantidad: incrementando}, {new: true})
                .then( (prod) => {
                    res.status(200).json({
                        success: true,
                        message: 'Se agrego un producto',
                        data: prod
                    })
                })
        } else if( productoEnviado && query === "decrementar"){
            if(productoEnviado.cantidad <= 1){
                res.status(400).json({
                    success: false,
                    message: 'No se puede eliminar más cantidad del producto',
                    data: productoEnviado
                })
            } else {
                let decrementando = productoEnviado.cantidad -= 1
                
                await Carrito.findOneAndUpdate({productoId: productoId}, {cantidad: decrementando}, {new: true})
                .then( (prod) => {
                    res.status(200).json({
                        success: true,
                        message: 'Se sacó un producto',
                        data: prod
                    })
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Ocurrio un error"
            })
        }
    },

    eliminarDelCarrito: async(req, res) => {
        const { productoId } = req.params
        // console.log(productoId);
        let productoEnCarrito = await Carrito.findOne({productoId: productoId})
        // console.log(productoEnCarrito);
        const { _id } = await Producto.findOne({nombre: productoEnCarrito.nombre})
        console.log(_id);
        try{
            await Carrito.findOneAndDelete({productoId: productoId})
            await Producto.findByIdAndUpdate(_id, {enCarrito: false}, {new: true})
            res.status(200).json({
                success: true,
                message: 'Producto eliminado del carrito'
            })
        } catch(error){
            res.status(400).json({
                success: false,
                message: 'No se pudo eliminar del carrito'
            })
        }
    }
}

module.exports = controller