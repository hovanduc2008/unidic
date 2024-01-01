const mongoose = require('mongoose');

// Định nghĩa schema cho Audio
const audioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    path: {
        type: String,
        required: true,
        trim: true,
    },
    voice: {
        type: String,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
    },
    duration: {
        type: String, 
        // required: true,
    },
    createdBy: {
        type: String,
        // required: true,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        trim: true,
    },
    format: {
        type: String,
        required: true,
        enum: ['MP3', 'WAV', 'FLAC', 'AAC'], // ví dụ các định dạng âm thanh
    },
    keywords: [{
        type: String,
        trim: true,
    }]
}, {
    timestamps : true
});

// Tạo model từ schema
const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
