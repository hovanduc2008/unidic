const asyncHandler = require('express-async-handler');
const GroupModel = require('../models/GroupModel'); // Đường dẫn tới model của bạn

// CREATE: Tạo một nhóm mới
const createGroup = asyncHandler(async (req, res) => {
  const { name, description, location, createdBy } = req.body;
  
  // Tạo một nhóm mới
  const group = new GroupModel({ name, description, location, createdBy });
  await group.save();
  
  res.status(201).json(group);
});

// READ: Lấy tất cả các nhóm
const getAllGroups = asyncHandler(async (req, res) => {
  const groups = await GroupModel.find().populate('members', 'username'); // Populate to get user details
  res.json(groups);
});

// UPDATE: Cập nhật thông tin một nhóm
const updateGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, location } = req.body;
  
  const updatedGroup = await GroupModel.findByIdAndUpdate(
    id,
    { name, description, location, updatedAt: Date.now() },
    { new: true }
  );
  
  if (!updatedGroup) {
    return res.status(404).json({ error: 'Group not found' });
  }
  
  res.json(updatedGroup);
});

// DELETE: Xóa một nhóm
const deleteGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedGroup = await GroupModel.findByIdAndDelete(id);
  
  if (!deletedGroup) {
    return res.status(404).json({ error: 'Group not found' });
  }
  
  res.json({ message: 'Group deleted successfully' });
});

module.exports = {
  createGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
};
