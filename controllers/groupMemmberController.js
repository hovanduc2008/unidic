const asyncHandler = require('express-async-handler');
const GroupMemberModel = require('../models/GroupMemberModel'); // Đường dẫn tới model của bạn

// CREATE: Thêm mới một thành viên vào nhóm
const addGroupMember = asyncHandler(async (req, res) => {
  const { userId, groupId, role } = req.body;
  
  // Tạo một thành viên mới cho nhóm
  const groupMember = new GroupMemberModel({ userId, groupId, role });
  await groupMember.save();
  
  res.status(201).json(groupMember);
});

// READ: Lấy tất cả các thành viên của một nhóm cụ thể
const getGroupMembersByGroupId = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  
  const groupMembers = await GroupMemberModel.find({ groupId }).populate('userId', 'username'); // Populate to get user details
  res.json(groupMembers);
});

// UPDATE: Cập nhật vai trò của một thành viên trong nhóm
const updateGroupMemberRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  
  const updatedGroupMember = await GroupMemberModel.findByIdAndUpdate(id, { role, updatedAt: Date.now() }, { new: true });
  
  if (!updatedGroupMember) {
    return res.status(404).json({ error: 'Group member not found' });
  }
  
  res.json(updatedGroupMember);
});

// DELETE: Xóa một thành viên khỏi nhóm
const removeGroupMember = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedGroupMember = await GroupMemberModel.findByIdAndDelete(id);
  
  if (!deletedGroupMember) {
    return res.status(404).json({ error: 'Group member not found' });
  }
  
  res.json({ message: 'Group member removed successfully' });
});

module.exports = {
  addGroupMember,
  getGroupMembersByGroupId,
  updateGroupMemberRole,
  removeGroupMember,
};
