const mongoose = require('mongoose');

// Định nghĩa schema cho EventModel
const eventSchema = new mongoose.Schema({
  // Tên của sự kiện
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // Mô tả chi tiết về sự kiện
  description: {
    type: String,
    trim: true
  },
  
  // Địa điểm diễn ra sự kiện
  location: {
    type: String,
    trim: true
  },
  
  // Thời gian bắt đầu sự kiện
  startDate: {
    type: Date,
    required: true
  },
  
  // Thời gian kết thúc sự kiện (nếu có)
  endDate: {
    type: Date
  },
  
  // Đường dẫn đến trang web hoặc tài liệu liên quan đến sự kiện
  website: {
    type: String,
    trim: true
  },
  
  // Người tổ chức sự kiện
  organizer: {
    type: String,
    trim: true
  },
  
  // Ngày tạo sự kiện
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Ngày cập nhật lần cuối của sự kiện
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
