const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    webContentLink: {
        type: String,
        required: true
    },
    webViewLink: {
      type: String,
      required: true
    },
    thumbnailLink: {
      type: String,
      required: true
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Image', imageSchema);