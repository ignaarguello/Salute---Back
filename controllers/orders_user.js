const Carrito = require('../models/Carrito')


const controller = {
    delete_orders_users: async (req, res) => {
        //?Metodo que elimina las compras del usuario en caso de ser exitosa
        const { usuarioId } = req.params

        console.log(req.params)
        try {
            await Carrito.deleteMany({ usuarioId: usuarioId })
            res.status(200).json({
                message: 'Compras Eliminadas con exito'
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    }
}

module.exports = controller
