const mongoose = require('mongoose');
require("dotenv").config({path: 'variables.env'});

const conectarDB = async () => {
    try {
        await mongoose
                    .connect(process.env.MONGODB_URI, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    })
                    console.log('Connected to MongoDB')
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = conectarDB;

