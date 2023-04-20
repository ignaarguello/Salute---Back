const axios = require("axios")

class PaymentService{
    async createPayment(req){
        // console.log(req);
        const url = "https://api.mercadopago.com/checkout/preferences"

        const body = {
                "items": [
                    {
                        "id": "idcompra-1",
                        "title": req.titulo,
                        "currency_id": "ARS",
                        "picture_url": req.imagen,
                        "description": `Sus productos son: ${req.titulo}`,
                        "category_id": "art",
                        "quantity": 1,
                        "unit_price": req.precio
                    }
                ],
                "payer": {
                    "name": req.nombreComprador,
                    "surname": req.apellidoComprador,
                    "email": req.emailComprador,
                    "phone": {
                        "area_code": "11",
                        "number": req.celularComprador
                    },
                    "identification": {
                        "type": "DNI",
                        "number": "12345678"
                    },
                    "address": {
                        "street_name": req.direccionComprador,
                        "street_number": req.alturaComprador,
                        "zip_code": req.postalComprador
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