const express = require('express')
const router = express.Router();

const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} 
= require('../controllers/articleCategoryController');

router.post('/', createCategory);
router.get('/getall', getCategories);
router.put('/', createCategory);
router.delete('/:id', createCategory);

module.exports = router;