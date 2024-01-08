const mongoose = require('mongoose');
const {google} = require('googleapis');
const fs = require('fs');

const videoSchema = new mongoose.Schema(
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
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Video', videoSchema);