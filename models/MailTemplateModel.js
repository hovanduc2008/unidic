const mongoose = require('mongoose');

// Định nghĩa schema cho MailTemplateModel
const mailTemplateSchema = new mongoose.Schema({
  // Tên hoặc tiêu đề của mẫu email
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // Mã ngắn hoặc biểu tượng đại diện cho mẫu email
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  // Nội dung chính của mẫu email
  content: {
    type: String,
    required: true
  },
  
  // Mô tả ngắn về mẫu email
  description: {
    type: String,
    trim: true
  },
  
  // Người tạo hoặc người cập nhật mẫu email
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Tham chiếu đến mô hình User (nếu có)
    required: true
  },
  
  // Ngày tạo mẫu email
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Ngày cập nhật lần cuối của mẫu email
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const MailTemplateModel = mongoose.model('MailTemplate', mailTemplateSchema);

module.exports = MailTemplateModel;
