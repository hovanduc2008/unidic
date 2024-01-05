const slugify = require('slugify');
const asyncHandler = require('express-async-handler');


const ArticleCategoryModel = require('../models/ArticleCategoryModel');
const {paginate, picker} = require('../config/common');


const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Tên danh mục là bắt buộc.' });
    }
    const slug = slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g });
    const category = new ArticleCategoryModel({ name, slug });
    await category.save();
    return res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ error: 'Failed to create category' });
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await ArticleCategoryModel.find();
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: 'Không có danh mục nào được tìm thấy.' });
    }
    return res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh mục.' });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    let slug;
    if (name) {
      slug = slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g });
    }
    const updateData = name ? { ...req.body, slug } : req.body;
    const category = await ArticleCategoryModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(500).json({ error: 'Failed to update category' });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await ArticleCategoryModel.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully', deletedCategoryId: categoryId });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ error: 'Failed to delete category' });
  }
});

const searchArticleCategories = asyncHandler(async (req, res) => {
  try {
    const queryParams = req.query;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perpage) || 10;

    const queryConditions = {
      $or: [
        { name: { $regex: queryParams.name || '' $options: 'i' } },
        { slug: { $regex: queryParams.slug || '', $options: 'i' } },
        { _id: queryParams.id }
      ]
    };

    console.log(queryParams.name)

    const articleCategories = await paginate(ArticleCategoryModel, queryConditions, page, perPage);
    if (!articleCategories || articleCategories.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục bài viết.' });
    }
    return res.status(200).json(articleCategories);
  } catch (error) {
    console.error('Error searching article categories:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm danh mục bài viết.' });
  }
});

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  searchArticleCategories
};
