const express = require('express')
const router = express.Router();

const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    searchArticleCategories
} 
= require('../controllers/articleCategoryController');

router.post('/', createCategory);
router.get('/getall', getCategories);
router.get('/search', searchArticleCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;