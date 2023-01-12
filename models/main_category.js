const mongoose = require('mongoose');

const mainCategorySchema = new mongoose.Schema({

    mainCategory: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('MainCategories', mainCategorySchema);