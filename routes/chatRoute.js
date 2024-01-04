const express = require('express');
const router = express.Router();
const {
    sendMessage,
    getChatMessagesBetweenUsers,
    updateMessageStatus,
    deleteMessage
} = require('../controllers/chatController'); // Adjust the path based on your directory structure

// Routes for chat messages
router.post('/send', sendMessage); // Send a new message
router.get('/between/:userId1/:userId2', getChatMessagesBetweenUsers); // Get messages between two users
router.put('/update/:messageId', updateMessageStatus); // Update status of a message by its ID
router.delete('/delete/:messageId', deleteMessage); // Delete a message by its ID

module.exports = router;
