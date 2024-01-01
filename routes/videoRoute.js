const express = require('express')
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');

const {
    uploadVideo,
    getStreamingVideo
} 
= require('../controllers/videoController');

router.post('/upload', uploadVideo);
router.get('/:id', getStreamingVideo);

module.exports = router;