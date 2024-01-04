const express = require('express');
const router = express.Router();
const {
    createLocation,
    getAllLocations,
    updateLocation,
    deleteLocation
} = require('../controllers/locationController'); // Adjust the path based on your directory structure

// Routes for locations
router.post('/create', createLocation); // Create a new location
router.get('/', getAllLocations); // Get all locations
router.put('/update/:id', updateLocation); // Update a location by ID
router.delete('/delete/:id', deleteLocation); // Delete a location by ID

module.exports = router;
