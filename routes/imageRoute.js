const express = require('express')
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');

const {
    uploadImage
} 
= require('../controllers/imageController');

router.post('/upload', uploadImage);

module.exports = router;