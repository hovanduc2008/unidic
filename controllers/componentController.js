const asyncHandler = require('express-async-handler');
const ComponentModel = require('../models/ComponentModel'); // Đường dẫn tới model của bạn

// CREATE: Thêm mới một thành phần
const createComponent = asyncHandler(async (req, res) => {
  const { name, description, type, documentationLink } = req.body;
  
  // Tạo một thành phần mới
  const component = new ComponentModel({ name, description, type, documentationLink });
  await component.save();
  
  res.status(201).json(component);
});

// READ: Lấy tất cả các thành phần
const getComponents = asyncHandler(async (req, res) => {
  const components = await ComponentModel.find();
  res.json(components);
});

// UPDATE: Cập nhật thông tin một thành phần
const updateComponent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, type, documentationLink } = req.body;
  
  // Tạo một đối tượng để cập nhật thông tin thành phần
  const updateData = { name, description, type, documentationLink, updatedAt: Date.now() };
  
  const updatedComponent = await ComponentModel.findByIdAndUpdate(id, updateData, { new: true });
  
  if (!updatedComponent) {
    return res.status(404).json({ error: 'Component not found' });
  }
  
  res.json(updatedComponent);
});

// DELETE: Xóa một thành phần
const deleteComponent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedComponent = await ComponentModel.findByIdAndDelete(id);
  
  if (!deletedComponent) {
    return res.status(404).json({ error: 'Component not found' });
  }
  
  res.json({ message: 'Component deleted successfully' });
});

module.exports = {
  createComponent,
  getComponents,
  updateComponent,
  deleteComponent,
};
