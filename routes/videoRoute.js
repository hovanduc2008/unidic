const express = require('express')
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');

const { uploadvideo } = require('../middlewares/multer');

const {
    uploadVideo,
    getStreamingVideo
} 
= require('../controllers/videoController');

router.post('/upload', uploadvideo.single('video'), uploadVideo);
router.get('/:id', getStreamingVideo);

module.exports = router;