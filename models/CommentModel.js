const mongoose = require('mongoose');

// Định nghĩa schema cho CommentModel
const commentSchema = new mongoose.Schema({
  // ID của người dùng đăng bình luận
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Tham chiếu đến mô hình User (nếu có)
    required: true
  },
  
  // Nội dung của bình luận
  content: {
    type: String,
    required: true
  },
  
  // ID của bài viết hoặc phần mà bình luận được đăng
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  
  // Thời gian đăng bình luận
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Thời gian cập nhật bình luận (nếu có chỉnh sửa)
  updatedAt: {
    type: Date
  },
  
  // Trạng thái của bình luận (đã duyệt, chưa duyệt, v.v.)
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],  // Có thể mở rộng thêm trạng thái khác nếu cần
    default: 'pending'
  }
});

// Tạo và xuất mô hình từ schema
const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
