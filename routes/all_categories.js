const express = require('express');
const Categories = require('../models/manage_category');

const router = express.Router();

//All Main Categories
router.get('/maincategories', (req, res) => {
    Categories.find().exec((err, maincategories) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingMainCategories: maincategories
        });
    });
});

//Get Specific Main Category
router.get('/maincategory/:sn', (req, res) => {
    let categorySN = req.params.sn;
    Categories.findBySN(categorySN, (err, maincategory) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            maincategory
        });
    });
});




//All Subcategories
router.get('/allsubcategories', (req, res) => {
    Categories.find().exec((err, subcategories) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingSubcategories: subcategories
        });
    });
});

//Get Specific Subcategory
router.get('/subcategory/:sn', (req, res) => {
    let categorySN = req.params.sn;
    Categories.findBySN(categorySN, (err, subcategory) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            subcategory
        });
    });
});



module.exports = router;