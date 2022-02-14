const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos Online');

    } catch (error) {
        console.log(error);
        throw  Error('Error, no fue posible conectar la base de datos')
    }

}



module.exports = {
    dbConnection
}