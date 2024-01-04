const express = require('express');
const router = express.Router();
const {
    createComponent,
    getComponents,
    updateComponent,
    deleteComponent
} = require('../controllers/componentController'); // Adjust the path based on your directory structure

// Routes for components
router.post('/create', createComponent); // Create a new component
router.get('/', getComponents); // Get all components
router.put('/update/:id', updateComponent); // Update a component by its ID
router.delete('/delete/:id', deleteComponent); // Delete a component by its ID

module.exports = router;
