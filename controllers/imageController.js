const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');

const cookieOptions = require('../config/cookieOptions')
const User = require('../models/UserModel')
const {generateRefreshToken} = require('../config/refreshToken')
const {generateAccessToken} = require('../config/accessToken');
const validateMongoDBId = require('../ultils/validateMongoDBId');

const {uploadImageHandler} = require('./FileController');

const uploadImage = asyncHandler(async (req, res) => {
    uploadImageHandler(req, res);
    return res.json('1');
})

module.exports = {
    uploadImage
}
