const asyncHandler = require('express-async-handler');
const ProductCategory = require('../models/ProductCategory'); // Đường dẫn tới model của bạn

// CREATE: Tạo một danh mục sản phẩm mới
const createProductCategory = asyncHandler(async (req, res) => {
  const { name, code, description, tags } = req.body;
  
  // Tạo một danh mục sản phẩm mới
  const productCategory = new ProductCategory({ name, code, description, tags });
  await productCategory.save();
  
  res.status(201).json(productCategory);
});

// READ: Lấy tất cả các danh mục sản phẩm
const getAllProductCategories = asyncHandler(async (req, res) => {
  const productCategories = await ProductCategory.find();
  res.json(productCategories);
});

// UPDATE: Cập nhật thông tin một danh mục sản phẩm
const updateProductCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, code, description, tags } = req.body;
  
  const updatedProductCategory = await ProductCategory.findByIdAndUpdate(
    id,
    { name, code, description, tags, updatedAt: Date.now() },
    { new: true }
  );
  
  if (!updatedProductCategory) {
    return res.status(404).json({ error: 'Product category not found' });
  }
  
  res.json(updatedProductCategory);
});

// DELETE: Xóa một danh mục sản phẩm
const deleteProductCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedProductCategory = await ProductCategory.findByIdAndDelete(id);
  
  if (!deletedProductCategory) {
    return res.status(404).json({ error: 'Product category not found' });
  }
  
  res.json({ message: 'Product category deleted successfully' });
});

module.exports = {
  createProductCategory,
  getAllProductCategories,
  updateProductCategory,
  deleteProductCategory,
};
