const mongoose = require('mongoose');

// Định nghĩa schema cho ProductModel
const productSchema = new mongoose.Schema({
  // Tên của sản phẩm
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // Mô tả chi tiết về sản phẩm
  description: {
    type: String,
    trim: true
  },
  
  // Giá của sản phẩm
  price: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Danh mục sản phẩm (tham chiếu đến ProductCategory)
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',  // Tham chiếu đến mô hình ProductCategory
    required: true
  },
  
  // Hình ảnh đại diện cho sản phẩm
  image: {
    type: String,
    trim: true
  },
  
  // Số lượng sản phẩm trong kho
  stockQuantity: {
    type: Number,
    default: 0
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'  // Tham chiếu đến mô hình Image
  }],
  
  // Ngày tạo sản phẩm
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Ngày cập nhật lần cuối của sản phẩm
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Tự động cập nhật thời gian khi có sự thay đổi
  timestamps: true
});

// Tạo và xuất mô hình từ schema
const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
