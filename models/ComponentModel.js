const mongoose = require('mongoose');

// Định nghĩa schema cho ComponentModel
const componentSchema = new mongoose.Schema({
  // Tên của thành phần
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // Mô tả ngắn về thành phần
  description: {
    type: String,
    trim: true
  },
  
  // Loại của thành phần (ví dụ: "UI", "Backend", "Database", v.v.)
  type: {
    type: String,
    required: true,
    enum: ['UI', 'Backend', 'Database', 'Middleware', 'Service', 'Other']
  },
  
  // Đường dẫn đến tài liệu hoặc hình ảnh liên quan đến thành phần (nếu có)
  documentationLink: {
    type: String,
    trim: true
  },
  
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const ComponentModel = mongoose.model('Component', componentSchema);

module.exports = ComponentModel;
