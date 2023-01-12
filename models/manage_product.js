const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    productName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Products', productSchema);