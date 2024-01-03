const mongoose = require('mongoose');

// Định nghĩa schema cho ScheduleModel
const scheduleSchema = new mongoose.Schema({
  // Tiêu đề hoặc tên của lịch
  title: {
    type: String,
    required: true,
    trim: true
  },
  
  // Mô tả chi tiết về lịch
  description: {
    type: String,
    trim: true
  },
  
  // Ngày và giờ bắt đầu của lịch
  startDate: {
    type: Date,
    required: true
  },
  
  // Ngày và giờ kết thúc của lịch
  endDate: {
    type: Date,
    required: true
  },
  
  // Địa điểm hoặc địa chỉ của sự kiện (nếu có)
  location: {
    type: String,
    trim: true
  },
  
  // Tham chiếu đến người dùng hoặc nguồn tạo lịch
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Tham chiếu đến mô hình User
    required: true
  },
  
  // Ngày tạo lịch
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Ngày cập nhật lần cuối của lịch
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const ScheduleModel = mongoose.model('Schedule', scheduleSchema);

module.exports = ScheduleModel;
