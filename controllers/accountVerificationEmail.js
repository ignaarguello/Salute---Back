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
    <div style='background-color:#0d0f19; padding:20px;'>
        <h1 style='color:#7c3aed; font-weight:200; font-size:30px; text-align:center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;'> Hola ${name} </h1>
        <div style='display:flex; justify-content: center; align-items: center; flex-direction:column;'>
            <h2 style='color:white; text-align:center; font-weight:300; font-size:18px; width:95%; padding-top:.5rem;'>
                 Te invitamos a validar tu cuenta...
            </h2>
        </div>
        <div style='display:flex; justify-content: center; align-items: center;'>
        <div style='background-color:#0f172a; padding:10px; border-radius:20px; justify-self:center; width:40%; margin:2rem 0; text-align:center;'><a style='text-decoration:none; color:#f1f5f9; font-weight:400;' href='${host}usuarios/verificar/${code}'>Validate Account</a></div>
        </div>
        <div style='width:100%; display:flex; justify-content: center; align-items: center;'>
            <img style='width:40%' src='https://drive.google.com/uc?export=view&id=1XBiUm0dDxttn7U_a-1P5xZwL5b73AuR1'>
        </div>
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
        subject: 'Verifica tu cuenta en Salute',
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