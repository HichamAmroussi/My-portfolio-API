const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const message = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true });

const Message = mongoose.model('Message', message);

module.exports = Message;
