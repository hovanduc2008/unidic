const express = require('express');
const router = express.Router();
const {
    addGroupMember,
    getGroupMembersByGroupId,
    updateGroupMemberRole,
    removeGroupMember
} = require('../controllers/groupMemmberController'); // Adjust the path based on your directory structure

// Routes for group members
router.post('/add', addGroupMember); // Add a member to a group
router.get('/group/:groupId', getGroupMembersByGroupId); // Get members of a specific group by group ID
router.put('/update/:id', updateGroupMemberRole); // Update the role of a group member by ID
router.delete('/remove/:id', removeGroupMember); // Remove a group member by ID

module.exports = router;
