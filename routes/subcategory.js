const express = require('express');
const Categories = require('../models/subcategory');

const router = express.Router();

//Add Subcategory
router.post('/subcategory/save', (req, res) => {
    let newCategory = new Categories(req.body);

    newCategory.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Added Successfully."
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
router.get('/subcategory/:id', (req, res) => {
    let categoryId = req.params.id;
    Categories.findById(categoryId, (err, subcategory) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            subcategory
        });
    });
});

//Update Subcategory
router.put('/subcategory/update/:id', (req, res) => {
    Categories.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, subcategory) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated Successfully."
            });
        }
    );
});

//Delete Subcategory
router.delete('/subcategory/delete/:id', (req, res) => {
    Categories.findByIdAndRemove(req.params.sn).exec((err, deletesubcategory) => {
        if (err) return res.status(400).json({
            message: "Delete unsuccessful", err
        });

        return res.json({
            message: "Deleted Successfully.", deletesubcategory
        });
    });
});

module.exports = router;