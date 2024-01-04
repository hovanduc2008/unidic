const asyncHandler = require('express-async-handler');
const ReviewModel = require('../models/ReviewModel'); // Make sure the path is correct

// CREATE: Create a new review
const createReview = asyncHandler(async (req, res) => {
  const { userId, productId, rating, content } = req.body;
  
  const review = new ReviewModel({ userId, productId, rating, content });
  await review.save();
  
  res.status(201).json(review);
});

// READ: Get all reviews
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await ReviewModel.find().populate('userId').populate('productId');
  res.json(reviews);
});

// UPDATE: Update a review
const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, content } = req.body;
  
  const updatedReview = await ReviewModel.findByIdAndUpdate(
    id,
    { rating, content, updatedAt: Date.now() },
    { new: true }
  );
  
  if (!updatedReview) {
    return res.status(404).json({ error: 'Review not found' });
  }
  
  res.json(updatedReview);
});

// DELETE: Delete a review
const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedReview = await ReviewModel.findByIdAndDelete(id);
  
  if (!deletedReview) {
    return res.status(404).json({ error: 'Review not found' });
  }
  
  res.json({ message: 'Review deleted successfully' });
});

module.exports = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
