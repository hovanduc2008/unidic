const mongoose = require('mongoose');

// Định nghĩa schema cho ProductCategory
const productCategorySchema = new mongoose.Schema({
  // Tên của danh mục sản phẩm
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // Mã đại diện cho danh mục (nếu có)
  code: {
    type: String,
    unique: true,
    trim: true
  },
  
  // Mô tả về danh mục sản phẩm
  description: {
    type: String,
    trim: true
  },
  
  // Thẻ (tags) liên quan đến danh mục sản phẩm
  tags: [{
    type: String,
    trim: true
  }],
  
  // Ngày tạo danh mục
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Ngày cập nhật lần cuối của danh mục
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

module.exports = ProductCategory;
