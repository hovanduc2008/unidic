const express = require('express');
const router = express.Router();
const {
    createProductCategory,
    getAllProductCategories,
    updateProductCategory,
    deleteProductCategory
} = require('../controllers/productCategoryController'); // Ensure the path points correctly to where your controller functions are defined

// Routes for product categories
router.post('/create', createProductCategory); // Create a new product category
router.get('/', getAllProductCategories); // Get all product categories
router.put('/update/:id', updateProductCategory); // Update a product category by ID
router.delete('/delete/:id', deleteProductCategory); // Delete a product category by ID

module.exports = router;
