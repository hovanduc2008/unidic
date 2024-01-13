const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ArticleModel = require('../models/ArticleModel'); // Điều chỉnh đường dẫn dựa trên cấu trúc thư mục của bạn

// CREATE: Thêm mới một bài viết
const createArticle = asyncHandler(async (req, res) => {
  try {
    const { title, description, content, thumbnail, image, category } = req.body;

    const slug = slugify(title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g
    });

    const article = new ArticleModel({ title, description, content, slug, thumbnail, image, category });
    await article.save();
    
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article', details: error.message });
  }
});

// READ: Lấy tất cả các bài viết
const getArticles = asyncHandler(async (req, res) => {
  try {
    const articles = await ArticleModel.find().populate('category', 'name');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles', details: error.message });
  }
});

// READ: Lấy một bài viết theo ID
const getArticleById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findById(id).populate('category', 'name');
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the article', details: error.message });
  }
});

// UPDATE: Cập nhật thông tin một bài viết
const updateArticle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, thumbnail, image, category } = req.body;
    
    const slug = slugify(title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g
    });

    const updateData = { title, description, content, slug, thumbnail, image, category, updatedAt: Date.now() };
    
    const updatedArticle = await ArticleModel.findByIdAndUpdate(id, updateData, { new: true }).populate('category', 'name');
    
    if (!updatedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the article', details: error.message });
  }
});

// DELETE: Xóa một bài viết
const deleteArticle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedArticle = await ArticleModel.findByIdAndDelete(id);
    
    if (!deletedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the article', details: error.message });
  }
});

const searchArticles = asyncHandler(async (req, res) => {
  try {
    const queryParams = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perpage) || 10;

    const queryConditions = {};

    if (queryParams.q) {
      queryConditions.$or = [
        { title: { $regex: queryParams.q, $options: 'i' } },
        { slug: { $regex: queryParams.q, $options: 'i' } }
      ];
    }

    const articleCategories = await paginate(ArticleCategoryModel, {
      search: queryConditions,
      sort: queryParams.sort
    }, page, perPage);

    if (!articleCategories || articleCategories.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết.' });
    }

    return res.status(200).json(articleCategories);

  } catch (error) {
    // Kiểm tra lỗi và xử lý nếu cần
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID không hợp lệ.' });
    }

    // Thêm xử lý cho các lỗi khác mà bạn mong muốn xử lý
    console.error('Error searching articles:', error);
    
    return res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm bài viết.' });
  }
});

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  searchArticles
};
