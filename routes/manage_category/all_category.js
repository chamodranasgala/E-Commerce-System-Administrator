const express = require('express');
const Categories = require('../../models/manage_category');

const router = express.Router();

//All Categories
router.get('/allcategories', (req, res) => {
    Categories.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingCategories: categories
        });
    });
});

module.exports = router;