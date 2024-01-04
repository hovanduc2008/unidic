const express = require('express');
const router = express.Router();
const {
    createMailTemplate,
    getAllMailTemplates,
    updateMailTemplate,
    deleteMailTemplate
} = require('../controllers/mailTemplateController'); // Adjust the path based on your directory structure

// Routes for mail templates
router.post('/create', createMailTemplate); // Create a new mail template
router.get('/', getAllMailTemplates); // Get all mail templates
router.put('/update/:id', updateMailTemplate); // Update a mail template by ID
router.delete('/delete/:id', deleteMailTemplate); // Delete a mail template by ID

module.exports = router;
