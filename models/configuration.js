const mongoose = require('../db/config');

const configurationSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    inputs: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Configuration', configurationSchema);