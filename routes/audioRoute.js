const express = require('express')
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');

const {
    generateAudiofromText
} 
= require('../controllers/audioController');

router.post('/generate', generateAudiofromText);

module.exports = router;