const asyncHandler = require('express-async-handler');
const ProductModel = require('../models/ProductModel'); // Đường dẫn tới model của bạn

// CREATE: Tạo một sản phẩm mới
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, image, stockQuantity, images } = req.body;
  
  const product = new ProductModel({ name, description, price, category, image, stockQuantity, images });
  await product.save();
  
  res.status(201).json(product);
});

// READ: Lấy tất cả các sản phẩm
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find().populate('category');
  res.json(products);
});

// UPDATE: Cập nhật thông tin một sản phẩm
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image, stockQuantity, images } = req.body;
  
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    id,
    { name, description, price, category, image, stockQuantity, images, updatedAt: Date.now() },
    { new: true }
  ).populate('category');
  
  if (!updatedProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(updatedProduct);
});

// DELETE: Xóa một sản phẩm
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  
  if (!deletedProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json({ message: 'Product deleted successfully' });
});

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
