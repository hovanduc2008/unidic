const express = require('express')
const router = express.Router();

const {uploadaudio} = require('../middlewares/multer')

const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');

const {
    generateAudiofromText,
    generateTextFromAudio
} 
= require('../controllers/audioController');

router.post('/tts',  generateAudiofromText);
router.post('/stt', uploadaudio.single('file'), generateTextFromAudio);

module.exports = router;