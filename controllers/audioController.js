const asyncHandler = require('express-async-handler');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const FormData = require('form-data');

const Audio = require('../models/AudioModel');

const TEXT_TO_SPEECH = process.env.TEXT_TO_SPEECH || 'b19lk9hTygRjuGilJilCLQprRuwN3tuS';

const generateAudiofromText = asyncHandler(async (req, res) => {
  try {
    const rawData = req.body.text;
    const cleanText = rawData.replace(/<[^>]*>/g, '');

    const voice = req.body.voice ?? 'myan';
    const speed = req.body.speed ?? 0;
    const format = req.body.format ?? 'mp3';

    const response = await axios.post('https://api.fpt.ai/hmi/tts/v5', cleanText, {
      headers: {
        'Content-Type': 'application/json',
        'api_key': TEXT_TO_SPEECH,
        'voice': voice,
        'speed': speed,
        'format': format,
        'X-TTS-NoCache': true
      }
    });

    const audio = await Audio.create({
      voice: voice,
      speed: speed,
      name: req.body.name ?? response.data.async,
      path: response.data.async,
      description: req.body.description ?? "",
      format: format.toUpperCase(),
      keywords: req.body.keywords ?? ""
    });

    res.json(audio);
  } catch (error) {
    console.error('Lỗi:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      message: 'Đã xảy ra lỗi khi chuyển đổi văn bản thành âm thanh.',
      error: error.message
    });
  }
});

const generateTextFromAudio = asyncHandler(async (req, res) => {
  try {
    const file = req.file;
    
    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    const filePath = file.path;
    const fileData = fs.readFileSync(filePath);

    const response = await axios.post('https://api.fpt.ai/hmi/asr/general', fileData, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'api_key': TEXT_TO_SPEECH,
        'X-TTS-NoCache': true
      }
    });

    return res.json(response.data);
  } catch (error) {
    console.error('Lỗi:', error.response ? error.response.data : error.message);
    return res.status(error.response ? error.response.status : 500).res.status(error.response ? error.response.status : 500).json({
      message: 'Đã xảy ra lỗi khi chuyển đổi âm thanh thành văn bản.',
      error: error.message
    });
  }
});

module.exports = {
  generateAudiofromText,
  generateTextFromAudio
};
