const mongoose = require('mongoose');

const articleCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  
  description: {
    type: String,
    trim: true
  },
  
  thumbnail: {
    type: String,
    trim: true
  },
  
  image: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const ArticleCategoryModel = mongoose.model('ArticleCategory', articleCategorySchema);

module.exports = ArticleCategoryModel;
