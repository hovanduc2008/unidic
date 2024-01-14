const express = require('express')
const router = express.Router();

const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    searchArticleCategories,
    findById,
    findBySlug
} 
= require('../controllers/articleCategoryController');

router.post('/', createCategory);
router.get('/getall', getCategories);
router.get('/search', searchArticleCategories);
router.get('/:id', findById);
router.get('/slug/:slug', findBySlug);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);


module.exports = router;