const asyncHandler = require('express-async-handler');
const ArticleModel = require('../models/ArticleModel'); // Đường dẫn tới model của bạn

// CREATE: Thêm mới một bài viết
const createArticle = asyncHandler(async (req, res) => {
  const article = new ArticleModel(req.body);
  await article.save();
  res.status(201).json(article);
});

// READ: Lấy tất cả bài viết
const getArticles = asyncHandler(async (req, res) => {
  const articles = await ArticleModel.find().populate('category'); // Populate category information
  res.json(articles);
});

// READ: Lấy một bài viết cụ thể bằng ID
const getArticleById = asyncHandler(async (req, res) => {
  const article = await ArticleModel.findById(req.params.id).populate('category'); // Populate category information
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  res.json(article);
});

// UPDATE: Cập nhật thông tin một bài viết
const updateArticle = asyncHandler(async (req, res) => {
  const article = await ArticleModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('category'); // Populate category information
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  res.json(article);
});

// DELETE: Xóa một bài viết
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await ArticleModel.findByIdAndDelete(req.params.id);
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  res.json({ message: 'Article deleted successfully' });
});

module.exports = {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
};
