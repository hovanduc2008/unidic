const express = require('express')
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');

const {upload} = require('../middlewares/multer');

const {
    uploadImage,
    getImage,
    getImages
} 
= require('../controllers/imageController');

router.post('/upload',upload.array('files[]'), uploadImage);
router.get('/:id', getImage);


// Post mảng ids là id của image
router.post('/gets', getImages);

module.exports = router;