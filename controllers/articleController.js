const asyncHandler = require('express-async-handler');
const ArticleModel = require('../models/ArticleModel'); // Điều chỉnh đường dẫn dựa trên cấu trúc thư mục của bạn

// CREATE: Thêm mới một bài viết
const createArticle = asyncHandler(async (req, res) => {
  const { title, description, content, slug, thumbnail, image, category } = req.body;
  
  const article = new ArticleModel({ title, description, content, slug, thumbnail, image, category });
  await article.save();
  
  res.status(201).json(article);
});

// READ: Lấy tất cả các bài viết
const getArticles = asyncHandler(async (req, res) => {
  const articles = await ArticleModel.find().populate('category', 'name'); // Populate category information
  res.json(articles);
});

// READ: Lấy một bài viết theo ID
const getArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await ArticleModel.findById(id).populate('category', 'name'); // Populate category information
  
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  
  res.json(article);
});

// UPDATE: Cập nhật thông tin một bài viết
const updateArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, content, slug, thumbnail, image, category } = req.body;
  
  const updateData = { title, description, content, slug, thumbnail, image, category, updatedAt: Date.now() };
  
  const updatedArticle = await ArticleModel.findByIdAndUpdate(id, updateData, { new: true }).populate('category', 'name'); // Populate category information
  
  if (!updatedArticle) {
    return res.status(404).json({ error: 'Article not found' });
  }
  
  res.json(updatedArticle);
});

// DELETE: Xóa một bài viết
const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedArticle = await ArticleModel.findByIdAndDelete(id);
  
  if (!deletedArticle) {
    return res.status(404).json({ error: 'Article not found' });
  }
  
  res.json({ message: 'Article deleted successfully' });
});

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
