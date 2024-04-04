require('dotenv').config()
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));

module.exports = mongoose;


