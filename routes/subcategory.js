const express = require('express');
const Categories = require('../models/manage_category');

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

//Update Subcategory
router.put('/subcategory/update/:sn', (req, res) => {
    Categories.findBySNAndUpdate(
        req.params.sn,
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
router.delete('/subcategory/delete/:sn', (req, res) => {
    Categories.findBySNAndRemove(req.params.sn).exec((err, deletedsubcategory) => {
        if (err) return res.status(400).json({
            message: "Delete unsuccessful", err
        });

        return res.json({
            message: "Deleted Successfully.", deletedsubcategory
        });
    });
});

module.exports = router;