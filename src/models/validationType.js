const mongoose = require('mongoose');

const validationTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true

    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('ValidationType', validationTypeSchema);