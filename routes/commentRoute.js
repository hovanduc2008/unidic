const express = require('express');
const router = express.Router();
const {
    createComment,
    getCommentsByPostId,
    updateComment,
    deleteComment
} = require('../controllers/commentController'); // Adjust the path based on your directory structure

// Routes for comments
router.post('/create', createComment); // Create a new comment
router.get('/post/:postId', getCommentsByPostId); // Get comments by post ID
router.put('/update/:commentId', updateComment); // Update a comment by its ID
router.delete('/delete/:commentId', deleteComment); // Delete a comment by its ID

module.exports = router;
