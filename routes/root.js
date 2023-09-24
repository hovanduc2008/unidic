const express = require('express');
const path = require('path');

const verifyRoles = require('../middlewares/verifyRoles')

const router = express.Router();

router.get('^/$|/index(.html)?',verifyRoles([2001, 2002]) ,(req, res) => {
    res.sendFile(path.join(__dirname,'..' ,'views', 'index.html'))
})

module.exports = router;