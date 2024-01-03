const asyncHandler = require('express-async-handler');
const ArticleCategoryModel = require('../models/ArticleCategoryModel'); // Đường dẫn tới model của bạn

// CREATE: Thêm mới một danh mục bài viết
const createCategory = asyncHandler(async (req, res) => {
  const category = new ArticleCategoryModel(req.body);
  await category.save();
  res.status(201).json(category);
});

// READ: Lấy tất cả danh mục bài viết
const getCategories = asyncHandler(async (req, res) => {
  const categories = await ArticleCategoryModel.find();
  res.json(categories);
});

// UPDATE: Cập nhật thông tin một danh mục bài viết
const updateCategory = asyncHandler(async (req, res) => {
  const category = await ArticleCategoryModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(category);
});

// DELETE: Xóa một danh mục bài viết
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await ArticleCategoryModel.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json({ message: 'Category deleted successfully' });
});

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}