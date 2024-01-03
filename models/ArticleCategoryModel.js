const mongoose = require('mongoose');

// Định nghĩa schema cho ArticleCategoryModel
const articleCategorySchema = new mongoose.Schema({
  // Tên của danh mục bài viết
  name: {
    type: String,
    required: true,
    trim: true,  // Loại bỏ khoảng trắng không cần thiết từ đầu và cuối
    unique: true  // Đảm bảo không có tên danh mục trùng lặp
  },
  
  // Slug cho danh mục bài viết (dùng để tạo URL thân thiện)
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  
  // Mô tả ngắn về danh mục bài viết
  description: {
    type: String,
    trim: true
  },
  
  // Đường dẫn hình ảnh thumbnail
  thumbnail: {
    type: String,
    trim: true
  },
  
  // Đường dẫn hình ảnh chính
  image: {
    type: String,
    trim: true
  },
  
  // Ngày tạo danh mục
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
const ArticleCategoryModel = mongoose.model('ArticleCategory', articleCategorySchema);

module.exports = ArticleCategoryModel;
