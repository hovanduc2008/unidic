const express = require('express');
const router = express.Router();
const {
  createTableOfContent,
  getAllTableOfContents,
  updateTableOfContent,
  deleteTableOfContent
} = require('../controllers/tableOfContentController'); // Ensure the path is correct

// Routes for table of contents
router.post('/create', createTableOfContent); // Create a new table of content
router.get('/', getAllTableOfContents); // Get all table of contents
router.put('/update/:id', updateTableOfContent); // Update a table of content by ID
router.delete('/delete/:id', deleteTableOfContent); // Delete a table of content by ID

module.exports = router;
