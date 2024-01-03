const mongoose = require('mongoose');

// Định nghĩa schema cho LocationModel
const locationSchema = new mongoose.Schema({
  // Tên của địa điểm
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // Địa chỉ cụ thể của địa điểm
  address: {
    type: String,
    required: true,
    trim: true
  },
  
  // Tọa độ địa lý (latitude và longitude) của địa điểm
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'  // Tạo chỉ mục địa lý cho truy vấn gần
    }
  },
  
  // Mô tả về địa điểm
  description: {
    type: String,
    trim: true
  },
  
  // Ngày tạo địa điểm
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Ngày cập nhật lần cuối của địa điểm
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const LocationModel = mongoose.model('Location', locationSchema);

module.exports = LocationModel;
