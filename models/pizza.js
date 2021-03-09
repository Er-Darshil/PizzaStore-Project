const mongoose = require('mongoose');

const Pizza = mongoose.model("Pizza", new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pizza: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    }

}, {timestamps: true}));

module.exports = Pizza;