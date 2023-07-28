const { createTransport } = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const { GOOGLE_ID, GOOGLE_REFRESH, GOOGLE_SECRET, GOOGLE_URL, GOOGLE_USER, BACK_URL } = process.env

function createClient() {
    return new OAuth2(
        GOOGLE_ID,
        GOOGLE_SECRET,
        GOOGLE_URL
    )
}

function getTransport(client) {
    const accessToken = client.getAccessToken()
    return createTransport({
        service: 'gmail',
        auth: {
            user: GOOGLE_USER,
            type: 'OAuth2',
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            refreshToken: GOOGLE_REFRESH,
            accessToken: accessToken
        },
        tls: { rejectUnauthorized: false }
    })
}


function getEmailBody({ code, host, name }) {
    return `   
            <div style='width:100%; background-color:#171717; display:flex; flex-direction:column; justify-content:center; align-items:center;'>
            <h1 style='color:#7c3aed; font-weight:200; font-size:30px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;'> Hola ${name} </h1>
            <div style='display:flex; justify-content: center; align-items: center; flex-direction:column;'>
            <h2 style='color:white; text-align:center; font-weight:300; font-size:18px; padding-top:.5rem;'>
                 Te invitamos a validar tu cuenta de nuestra plataforma. Muchas gracias.
            </h2>   
                <a style='background-color:#5b21b6; padding:10px; text-decoration:none; color:#f9fafb; font-weight:400; border-radius:30px; margin:2rem 0;' href='${host}/usuarios/verificar/${code}'>Validar Cuenta</a>
            </div>    
    `
}

const accountVerificationEmail = async (newUserMail, codeWithCrypto, userName) => {
    const client = createClient()
    client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH })
    const transport = getTransport(client)
    const mailOptions = {
        from: GOOGLE_USER,
        to: newUserMail,
        subject: 'Verificación de cuenta en Salute Drinks',
        html: getEmailBody({ name: userName, code: codeWithCrypto, host: BACK_URL })
    }
    await transport.sendMail(
        mailOptions,
        (error, response) => {
            if (error) {
                console.error(error)
                return
            }
            console.log('Email enviado!')
        }
    )
}

module.exports = accountVerificationEmail