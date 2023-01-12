const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({

    subcategory: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Subcategories', subcategorySchema);
