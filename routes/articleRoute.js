// articleRoutes.js

const express = require('express');
const router = express.Router();
const {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} = require('../controllers/articleController'); // Điều chỉnh đường dẫn dựa trên cấu trúc thư mục của bạn

// Định nghĩa các route cho model article
router.post('/', createArticle); // Tạo một bài viết mới
router.get('/', getArticles);   // Lấy tất cả các bài viết
router.get('/:id', getArticleById); // Lấy một bài viết cụ thể bằng ID
router.put('/:id', updateArticle); // Cập nhật một bài viết cụ thể bằng ID
router.delete('/:id', deleteArticle); // Xóa một bài viết cụ thể bằng ID

module.exports = router;
