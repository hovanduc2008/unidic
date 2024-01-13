const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')


const verifyJWT = asyncHandler(async (req, res, next) => {
    next();
    // const authHeader = req.headers.authorization || req.headers.Authorization;
    // if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); 
    // const token = authHeader.split(' ')[1];
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if (err) return res.sendStatus(403); // Invalid Token
    //     req.userInfo = decoded.userInfo;
    //     next();
    // })
})

module.exports = verifyJWT;