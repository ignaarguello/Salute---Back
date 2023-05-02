const mercadopago = require('mercadopago')
require('dotenv').config()

mercadopago.configure({ access_token: process.env.ACCESS_TOKEN })

const controller = {
    create: async (req, res) => {
        const product = req.body
        try {
            let preference = {
                items: [
                    {
                        id: 123,
                        title: 'Compra Salute Drinks',
                        currency_id: 'ARS',
                        picture_url: 'https://salute-front.vercel.app/images/logo-salute.png',
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

                    if (response.status === 201) {
                        console.log('Todo salio OK')
                    }
                })
                .catch((error) => res.status(400).send({ error: error.manssage })
                )

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
}


module.exports = controller