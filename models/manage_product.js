const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    productName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    qty: {
        type: String,
        required: true
    },

    availability: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Products', productSchema);