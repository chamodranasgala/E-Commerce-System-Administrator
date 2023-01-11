const express = require('express');
const Categories = require('../../models/manage_category');

const router = express.Router();

//Add Category
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

//All Categories
router.get('/allmaincategories', (req, res) => {
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

//Get Specific Category
router.get('/maincategory/:sn', (req, res) => {
    let categorySN = req.params.sn;
    Categories.findBySN(categorySN, (err, category) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            category
        });
    });
});

//Update Category
router.put('/maincategory/update/:sn', (req, res) => {
    Categories.findBySNAndUpdate(
        req.params.sn,
        {
            $set: req.body
        },
        (err, category) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated Successfully."
            });
        }
    );
});

//Delete Category
router.delete('/maincategory/delete/:sn', (req, res) => {
    Categories.findBySNAndRemove(req.params.sn).exec((err, deletedcategory) => {
        if (err) return res.status(400).json({
            message: "Delete unsuccessful", err
        });

        return res.json({
            message: "Deleted Successfully.", deletedcategory
        });
    });
});

module.exports = router;