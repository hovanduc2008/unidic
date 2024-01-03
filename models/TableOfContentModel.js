const mongoose = require('mongoose');

// Định nghĩa schema cho TableOfContentModel
const tableOfContentSchema = new mongoose.Schema({
  // Tên mục lục hoặc tiêu đề chính
  title: {
    type: String,
    required: true,
    trim: true
  },
  
  // Mô tả ngắn về nội dung của mục lục (nếu cần)
  description: {
    type: String,
    trim: true
  },
  
  // Đường dẫn hoặc URL đến nội dung liên quan (nếu có)
  link: {
    type: String,
    trim: true
  },
  
  // Mức độ ưu tiên hoặc thứ tự của mục lục
  order: {
    type: Number,
    default: 1  // Mặc định là 1, có thể thay đổi theo yêu cầu
  },
  
  // ID của mục lục cha (nếu có), tạo quan hệ phân cấp
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TableOfContent'  // Tham chiếu đến chính mô hình TableOfContent
  },
  
  // Ngày tạo mục lục
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Ngày cập nhật lần cuối của mục lục
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const TableOfContentModel = mongoose.model('TableOfContent', tableOfContentSchema);

module.exports = TableOfContentModel;
