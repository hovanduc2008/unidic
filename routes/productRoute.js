const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/productController'); // Ensure the path points correctly to where your controller functions are defined

// Routes for products
router.post('/create', createProduct); // Create a new product
router.get('/', getAllProducts); // Get all products
router.put('/update/:id', updateProduct); // Update a product by ID
router.delete('/delete/:id', deleteProduct); // Delete a product by ID

module.exports = router;
