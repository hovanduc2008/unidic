const mongoose = require('mongoose');

// Định nghĩa schema cho ArticleModel
const articleSchema = new mongoose.Schema({
  // Tiêu đề của bài viết
  title: {
    type: String,
    required: true,
    trim: true
  },
  
  // Mô tả ngắn về bài viết
  description: {
    type: String,
    trim: true
  },
  
  // Nội dung chi tiết của bài viết
  content: {
    type: String,
    required: true
  },
  
  // Slug cho bài viết (dùng để tạo URL thân thiện)
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  
  // Đường dẫn hình ảnh đại diện cho bài viết
  thumbnail: {
    type: String,
    trim: true
  },
  
  // Đường dẫn hình ảnh chính của bài viết
  image: {
    type: String,
    trim: true
  },
  
  // Danh mục của bài viết (tham chiếu đến mô hình ArticleCategory)
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleCategory',
    required: true
  },
  
  // Ngày tạo bài viết
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Ngày cập nhật lần cuối
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const ArticleModel = mongoose.model('Article', articleSchema);

module.exports = ArticleModel;
