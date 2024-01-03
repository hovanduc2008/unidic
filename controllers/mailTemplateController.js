const asyncHandler = require('express-async-handler');
const MailTemplateModel = require('../models/MailTemplateModel'); // Đường dẫn tới model của bạn

// CREATE: Tạo một mẫu email mới
const createMailTemplate = asyncHandler(async (req, res) => {
  const { name, slug, content, description, createdBy } = req.body;
  
  // Tạo một mẫu email mới
  const mailTemplate = new MailTemplateModel({ name, slug, content, description, createdBy });
  await mailTemplate.save();
  
  res.status(201).json(mailTemplate);
});

// READ: Lấy tất cả các mẫu email
const getAllMailTemplates = asyncHandler(async (req, res) => {
  const mailTemplates = await MailTemplateModel.find();
  res.json(mailTemplates);
});

// UPDATE: Cập nhật thông tin một mẫu email
const updateMailTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, slug, content, description } = req.body;
  
  const updatedMailTemplate = await MailTemplateModel.findByIdAndUpdate(
    id,
    { name, slug, content, description, updatedAt: Date.now() },
    { new: true }
  );
  
  if (!updatedMailTemplate) {
    return res.status(404).json({ error: 'Mail template not found' });
  }
  
  res.json(updatedMailTemplate);
});

// DELETE: Xóa một mẫu email
const deleteMailTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedMailTemplate = await MailTemplateModel.findByIdAndDelete(id);
  
  if (!deletedMailTemplate) {
    return res.status(404).json({ error: 'Mail template not found' });
  }
  
  res.json({ message: 'Mail template deleted successfully' });
});

module.exports = {
  createMailTemplate,
  getAllMailTemplates,
  updateMailTemplate,
  deleteMailTemplate,
};
