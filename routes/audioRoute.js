const express = require('express')
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');

const {
    generateAudiofromText,
    generateTextFromAudio
} 
= require('../controllers/audioController');

router.post('/tts', generateAudiofromText);
router.post('/stt', generateTextFromAudio);

module.exports = router;