const mongoose = require('mongoose');

// Định nghĩa schema cho GroupMemberModel
const groupMemberSchema = new mongoose.Schema({
  // ID của người dùng (thành viên)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Tham chiếu đến mô hình User (nếu có)
    required: true
  },
  
  // ID của nhóm hoặc tổ chức mà thành viên đó tham gia
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',  // Tham chiếu đến mô hình Group (nếu có)
    required: true
  },
  
  // Vai trò hoặc quyền hạn của thành viên trong nhóm (ví dụ: 'admin', 'member', 'moderator')
  role: {
    type: String,
    required: true,
    enum: ['admin', 'member', 'moderator']
  },
  
  // Thời gian gia nhập nhóm
  joinedAt: {
    type: Date,
    default: Date.now
  },
  
  // Thời gian cập nhật thông tin thành viên
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const GroupMemberModel = mongoose.model('GroupMember', groupMemberSchema);

module.exports = GroupMemberModel;
