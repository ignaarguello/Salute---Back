const mercadopago = require('mercadopago')
require('dotenv').config()
const Carrito = require('../models/Carrito')

mercadopago.configure({ access_token: process.env.ACCESS_TOKEN })

const controller = {
    create: async (req, res) => {
        const product = req.body

        const { usuarioId } = req.body
        console.log('Obtuvimos usuario del req', usuarioId)

        try {
            let preference = {
                items: [
                    {
                        id: 123,
                        title: 'Compra Salute Drinks',
                        currency_id: 'ARS',
                        picture_url: 'https://firebasestorage.googleapis.com/v0/b/salute-drinks-firebase.appspot.com/o/logo-salute.png?alt=media&token=e6eff94b-d527-41cb-a11e-daa6fc9a96d2',
                        category_id: 'art',
                        quantity: 1,
                        unit_price: product.precio,
                    }
                ],
                back_urls: {
                    success: 'http://localhost:3000',
                    pending: '',
                    failure: '',
                },
                auto_return: 'approved',
                binady_mode: true,
            }

            await mercadopago.preferences.create(preference)
                .then((response) => {
                    res
                        .status(200)
                        .json({
                            success: true,
                            response
                        })
                })
                .catch((error) => res.status(400).send({ error: error.manssage })
                )

            await Carrito.deleteMany({ usuarioId: usuarioId })
            console.log('Compras eliminadas desde controlador Payment')
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
}


module.exports = controller