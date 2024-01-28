const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');

const cookieOptions = require('../config/cookieOptions')
const Video = require('../models/VideoModel')


const {uploadVideoHandler} = require('./FileController');

const uploadVideo = asyncHandler(async (req, res) => {
    const file = req.file;

    
    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    const filePath = file.path;
    
    const fileUrl = await uploadVideoHandler(file);

    const video = await Video.create(
        {
            title: file.originalname,
            webContentLink: fileUrl.url.webContentLink,
            webViewLink: fileUrl.url.webViewLink,
            thumbnailLink: fileUrl.url.thumbnailLink,
            mimeType: fileUrl.mimeType
        }
    );

    console.log({
        title: file.originalname,
        webContentLink: fileUrl.url.webContentLink,
        webViewLink: fileUrl.url.webViewLink,
        thumbnailLink: fileUrl.url.thumbnailLink,
        mimeType: fileUrl.mimeType
    })
    return res.json(video);
})

const getStreamingVideo = asyncHandler(async (req, res) => {
    // Kiểm tra nếu đường dẫn video không tồn tại
    const id = (req.params.id) ? req.params.id : null;

    if(!id) return 1; 

    const video = await Video.findById({ _id: id });

    var videoPath = path.join(__dirname, video.webContentLink);
    console.log(videoPath);
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
