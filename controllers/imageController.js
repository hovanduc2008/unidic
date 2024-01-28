const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');

const {uploadImageHandler} = require('./FileController');

const Image = require('../models/ImageModel');


const uploadImage = asyncHandler(async (req, res) => {
    const files = req.files;

    if (!files) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    const fileUrls = [];

    // Sử dụng Promise.all để xử lý việc upload và xóa file
    await Promise.all(files.map(async (file) => {
        const filePath = file.path;

        try {
            const fileUrl = await uploadImageHandler(file);
            fileUrls.push(
                {
                    title: file.originalname,
                    webContentLink: fileUrl.url.webContentLink,
                    webViewLink: fileUrl.url.webViewLink,
                    thumbnailLink: fileUrl.url.thumbnailLink,
                    mimeType: fileUrl.mimeType
                }
            );
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }));

    const images = await Image.insertMany(fileUrls);

    return res.json(images);
});

const getImage = asyncHandler(async function(req, res) {
    image = await Image.findOne({_id: req.params.id});
    return res.json(image);
})

const getImages = async function(req, res) {
    const { ids } = req.body;

    try {
        // Find images by their IDs
        const images = await Image.find({ _id: { $in: ids } });
        
        if (!images || images.length === 0) {
        return res.status(404).send('No images found');
        }
        
        // Send the images in the response
        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    uploadImage,
    getImage,
    getImages
}
