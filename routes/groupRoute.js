const express = require('express');
const router = express.Router();
const {
    createGroup,
    getAllGroups,
    updateGroup,
    deleteGroup
} = require('../controllers/groupController'); // Adjust the path based on your directory structure

// Routes for groups
router.post('/create', createGroup); // Create a new group
router.get('/', getAllGroups); // Get all groups
router.put('/update/:id', updateGroup); // Update a group by ID
router.delete('/delete/:id', deleteGroup); // Delete a group by ID

module.exports = router;
