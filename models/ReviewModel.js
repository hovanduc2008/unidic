const mongoose = require('mongoose');

// Định nghĩa schema cho ReviewModel
const reviewSchema = new mongoose.Schema({
  // ID của người dùng đăng đánh giá
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Tham chiếu đến mô hình User
    required: true
  },
  
  // ID của sản phẩm được đánh giá
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Tham chiếu đến mô hình Product
    required: true
  },
  
  // Đánh giá (số sao, điểm số, v.v.)
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  
  // Nội dung đánh giá
  content: {
    type: String,
    trim: true
  },
  
  // Ngày tạo đánh giá
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Ngày cập nhật lần cuối của đánh giá
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;
