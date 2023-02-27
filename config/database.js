const mongoose = require('mongoose')

let connection = async() => {
    try{
        mongoose.connect(
            process.env.BBDD,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }
        )
        console.log("------ Conectado a la base de datos ------");
    } catch(error){
        console.log(error.message);
    }
}

connection()