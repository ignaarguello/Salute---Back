const { createTransport } = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const { GOOGLE_ID,GOOGLE_REFRESH,GOOGLE_SECRET,GOOGLE_URL,GOOGLE_USER,BACK_URL } = process.env

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


function getEmailBody({code,host,name}) {
    return `
    <div
        style="background-image: url(https://drive.google.com/uc?export=view&id=1_qZZLs1M4qGCz8L8d8fKzVHUlISuILfF); background-size: cover;
        background-position: center; background-color: rgb(45, 45, 45); background-blend-mode: multiply;border-radius: 1.5rem; padding: 1.5rem; border-style: groove; width: 70%; height:18rem; text-align:center; justify-content: space-between;">
        <h1
            style="font-size:2rem; font-style:oblique; font-family: Georgia, 'Times New Roman', Times, serif; color:white; text-align:center; text-decoration: none">
            ¡Hola ${name}!</h1>
        <p style="font-size: 1.2rem; text-align:center; font-family: Tahoma, Geneva, Verdana, sans-serif; color: white">
            Estamos muy contentos de que te quieras sumar a nuestra comunidad <span style="font-style: italic">Salute<span>.</p>
        <p style="text-align:center; color: white; font-size: 1.2rem; font-family: Tahoma, Geneva, Verdana, sans-serif">Por favor, hacé click en el botón de abajo para verificar tu cuenta en Salute Drinks</p>
        <div><a href="${host}/usuarios/verificar/${code}" style="background-color: white; padding: .6rem 2.6rem; font-size: 1.5rem;font-family: Tahoma; text-decoration: none; color: black; border-radius: 20px;">VERIFICARME</a></div>
    </div>
    `
}

const accountVerificationEmail = async (newUserMail,codeWithCrypto, userName) => {
    const client = createClient() 
    client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH }) 
    const transport = getTransport(client) 
    const mailOptions = { 
        from: GOOGLE_USER, 
        to: newUserMail, 
        subject: 'Verifica tu cuenta en Salute', 
        html: getEmailBody({ name:userName, code:codeWithCrypto, host:BACK_URL }) 
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