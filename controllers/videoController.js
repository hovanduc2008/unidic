const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');

const cookieOptions = require('../config/cookieOptions')
const User = require('../models/UserModel')
const {generateRefreshToken} = require('../config/refreshToken')
const {generateAccessToken} = require('../config/accessToken');
const validateMongoDBId = require('../ultils/validateMongoDBId');

const {uploadVideoHandler} = require('./FileController');

const uploadVideo = asyncHandler(async (req, res) => {
    uploadVideoHandler(req, res);
    return res.json('1');
})

const getStreamingVideo = asyncHandler(async (req, res) => {
    // Kiểm tra nếu đường dẫn video không tồn tại
    var videoPath = path.join(__dirname, '../../testvideo.mp4');
    if (!fs.existsSync(videoPath)) {
        return res.status(404).send('Video not found');
    }

    const fileSize = fs.statSync(videoPath).size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
})

module.exports = {
    uploadVideo,
    getStreamingVideo
}
