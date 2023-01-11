const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    mainCategory: {
        type: String,
        required: true
    },

    subcategory: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Categories', categorySchema);