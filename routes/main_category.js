const express = require('express');
const Categories = require('../models/manage_category');

const router = express.Router();

//Add Main Category
router.post('/maincategory/save', (req, res) => {
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

//Update Main Category
router.put('/maincategory/update/:sn', (req, res) => {
    Categories.findBySNAndUpdate(
        req.params.sn,
        {
            $set: req.body
        },
        (err, maincategory) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated Successfully."
            });
        }
    );
});

//Delete Main Category
router.delete('/maincategory/delete/:sn', (req, res) => {
    Categories.findBySNAndRemove(req.params.sn).exec((err, deletemaincategory) => {
        if (err) return res.status(400).json({
            message: "Delete Unsuccessful", err
        });

        return res.json({
            message: "Deleted Successfully.", deletemaincategory
        });
    });
});

module.exports = router;