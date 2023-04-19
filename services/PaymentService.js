const axios = require("axios")

class PaymentService {
    async createPayment(req) {
        console.log(req);
        const url = "https://api.mercadopago.com/checkout/preferences"

        const body = {
            "items": [
                {
                    "id": "item-ID-1234",
                    "title": 'Compra Salute Drinks',
                    "currency_id": "ARS",
                    "picture_url": 'https://salute-front.vercel.app/images/logo-salute.png',
                    "description": `Compra en tienda oficial de Salute Drinks`,
                    "category_id": "art",
                    "quantity": 1,
                    "unit_price": req.precio
                }
            ],
            "payer": {
                "name": "Juan",
                "surname": "Lopez",
                "email": "test_user_1005535830@testuser.com",
                "phone": {
                    "area_code": "11",
                    "number": "4444-4444"
                },
                "identification": {
                    "type": "DNI",
                    "number": "12345678"
                },
                "address": {
                    "street_name": "Street",
                    "street_number": 123,
                    "zip_code": "5700"
                }
            },
            "back_urls": {
                "success": "http://localhost:3000",
                "failure": "http://localhost:3000/carrito",
                "pending": "http://localhost:3000/salute-tv"
            },
            "auto_return": "approved",
            "payment_methods": {
                "excluded_payment_methods": [
                    {
                        "id": "master"
                    }
                ],
                "excluded_payment_types": [
                    {
                        "id": "ticket"
                    }
                ],
                "installments": 6
            },
            "notification_url": "https://www.your-site.com/ipn",
            "statement_descriptor": "MINEGOCIO",
            "external_reference": "Reference_1234",
            "expires": false,
        }

        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        return payment.data
    }
}

module.exports = PaymentService