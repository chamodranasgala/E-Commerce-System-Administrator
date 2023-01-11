const express = require('express');
const Products = require('../models/manage_product');

const router = express.Router();

//add product
router.post('/addproduct/save', (req, res) => {
    let newProduct = new Products(req.body);

    newProduct.save((err) => {
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

//get products
router.get('/products', (req, res) => {
    Products.find().exec((err, products) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingProducts: products
        });
    });
});

//get specific product
router.get('/product/:sn', (req, res) => {
    let productSN = req.params.sn;
    Products.findBySN(productSN, (err, product) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            product
        });
    });
});

//Update product
router.put('/product/update/:sn', (req, res) => {
    Products.findBySNAndUpdate(
        req.params.sn,
        {
            $set: req.body
        },
        (err, product) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated Successfully."
            });
        }
    );
});

//Delete product
router.delete('/product/delete/:sn', (req, res) => {
    Products.findBySNAndRemove(req.params.sn).exec((err, deletedproduct) => {
        if (err) return res.status(400).json({
            message: "Deleted Unsuccessful.", err
        });

        return res.json({
            message: "Deleted Successfully.", deletedproduct
        });
    });
});

module.exports = router;