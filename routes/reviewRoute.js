const express = require('express');
const router = express.Router();
const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewController'); // Ensure the path is correct

// Routes for reviews
router.post('/create', createReview); // Create a new review
router.get('/', getAllReviews); // Get all reviews
router.put('/update/:id', updateReview); // Update a review by ID
router.delete('/delete/:id', deleteReview); // Delete a review by ID

module.exports = router;
