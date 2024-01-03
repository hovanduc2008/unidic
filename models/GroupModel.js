const mongoose = require('mongoose');

// Định nghĩa schema cho GroupModel
const groupSchema = new mongoose.Schema({
  // Tên của nhóm
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // Mô tả về nhóm
  description: {
    type: String,
    trim: true
  },
  
  // Địa điểm hoặc vị trí của nhóm (nếu có)
  location: {
    type: String,
    trim: true
  },
  
  // Thành viên của nhóm
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  // Tham chiếu đến mô hình User (nếu có)
  }],
  
  // Người sáng lập hoặc quản trị viên chính của nhóm
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Tham chiếu đến mô hình User (nếu có)
    required: true
  },
  
  // Ngày tạo nhóm
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Ngày cập nhật lần cuối của nhóm
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const GroupModel = mongoose.model('Group', groupSchema);

module.exports = GroupModel;
