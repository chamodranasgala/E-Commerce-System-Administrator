const express = require('express');
const Products = require('../models/product');

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
router.get('/product/:id', (req, res) => {
    let productId = req.params.id;
    Products.findById(productId, (err, product) => {
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
router.put('/product/update/:id', (req, res) => {
    Products.findByIdAndUpdate(
        req.params.id,
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
router.delete('/product/delete/:id', (req, res) => {
    Products.findByIdAndRemove(req.params.id).exec((err, deletedproduct) => {
        if (err) return res.status(400).json({
            message: "Deleted Unsuccessful.", err
        });

        return res.json({
            message: "Deleted Successfully.", deletedproduct
        });
    });
});

module.exports = router;
