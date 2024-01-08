const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();
const FormData = require('form-data');

const Audio = require('../models/AudioModel')
const SPEECH_TO_TEXT = '';

const TEXT_TO_SPEECH = process.env.TEXT_TO_SPEECH || 'b19lk9hTygRjuGilJilCLQprRuwN3tuS';

const generateAudiofromText = asyncHandler(async (req, res) => {
    try {
      const rawData = req.body.text; // Giả sử rawData chứa chuỗi có thẻ HTML
      const cleanText = rawData.replace(/<[^>]*>/g, ''); // Loại bỏ các thẻ HTML

      const voice = req.body.voice ?? 'myan';
      const speed = req.body.speed ?? 0;
      const format = req.body.format ?? 'mp3';
      // Gửi yêu cầu POST dưới dạng raw
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
      console.error('Lỗi:', error);
      res.status(500).send('Đã xảy ra lỗi khi chuyển đổi văn bản thành âm thanh.');
    }
})

const generateTextFromAudio = asyncHandler(async (req, res) => {
  try {
    // Check if a file is received from the request
    const file = req.file;

    console.log(file);
    
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

    return res.json(response.data); // Return specific data to the client
  } catch (error) {
    console.error('Lỗi:', error);
    return res.status(500).send('Đã xảy ra lỗi khi chuyển đổi âm thanh thành văn bản.');
  }
});




module.exports = {
    generateAudiofromText,
    generateTextFromAudio
}
