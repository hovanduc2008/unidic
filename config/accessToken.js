const jwt = require("jsonwebtoken");

const generateAccessToken = (token = {}) => {
  return jwt.sign(token, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7h" });
};

module.exports = { generateAccessToken };