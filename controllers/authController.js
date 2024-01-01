const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

const cookieOptions = require('../config/cookieOptions')
const User = require('../models/UserModel')
const {generateRefreshToken} = require('../config/refreshToken')
const {generateAccessToken} = require('../config/accessToken');
const validateMongoDBId = require('../ultils/validateMongoDBId');


const { paginate, picker } = require('../config/common');



// Create new User
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;

    const foundUser = await User.findOne({email});
    
    if (!foundUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }else {
        throw new Error('User already exists');
    }
})

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            "message": "Email or Password are required!"
        })
    }

    const foundUser = await User.findOne({email});

    if (!foundUser) return res.sendStatus(401);

    if (await foundUser.isPasswordMatched(password)) {
        const accessToken = generateAccessToken({
            userInfo: {
                id: foundUser.id,
                roles: Object.values(foundUser.roles)
            }
        });
        const refreshToken = generateRefreshToken(foundUser?._id);
        
        const updateuser = await User.findByIdAndUpdate(
            foundUser.id,
            {
              refreshToken: refreshToken,
            },
            { new: true }
        );

        res.cookie("refreshToken", refreshToken, cookieOptions);

        res.json({
            accessToken
        });
    }else {
        return res.sendStatus(401);
    }

})


// Refresh Token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error(`No Refresh Token in Cookies`);
    const refreshToken = cookie.refreshToken;
    const foundUser = await User.findOne({refreshToken});
    if (!foundUser) throw new Error(`No refresh token present in DB or not matched`);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
        if(err || decode.id !== foundUser.id) {
            throw new Error(`There is something wrong with refresh token`)
        }
        const accessToken = generateAccessToken({
            userInfo: {
                id: foundUser.id,
                roles: Object.values(foundUser.roles)
            }
        });
        res.json({ accessToken });
    })
})

// Logout User
const logoutUser = asyncHandler (async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error(`No RefreshToken in Cookies`);
    const refreshToken = cookie.refreshToken;
    const foundUser = await User.findOne({refreshToken});
    if (!foundUser) {
        res.clearCookie("refreshToken", cookieOptions);
        return res.sendStatus(204);
    }

    foundUser.refreshToken = "";
    await foundUser.save();

    res.clearCookie("refreshToken", cookieOptions);
    res.sendStatus(204);
})

// Get All Users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perpage) || 10;

        const result = await paginate(User, {}, page, perPage, picker([]));

        if(!result || result.data.length < 1) return res.status(404).json({ message: 'Không tìm thấy dữ liệu.' });
        
        return res.json(result);
    }catch (err) {
        throw new Error(err);
    }
})

// Get a single User
const getUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const foundUser = await User.findById(id);
        if (!foundUser) return res.sendStatus(204);
        res.json(foundUser);
    }catch (err) {
        throw new Error(err);
    }
})

// Delete a single User

const deleteUser = asyncHandler (async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);

    try {
        const deleteU = await User.findByIdAndDelete(id);
        res.json(deleteU);
    }catch (err) {
        throw new Error(err);
    }
})

// Block a User

const blockUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        const blockU = await User.findByIdAndUpdate(id, {
            isBlocked: true
        },
        {
            new: true
        })

        res.json(blockU);
    }catch (err) {
        throw new Error(err);
    }
})

// UnBlock User

const unBlockUser = asyncHandler (async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);

    try {
        await User.findByIdAndUpdate(id, {
            isBlocked: false
        },
        {
            new: true
        })

        res.json({message: 'User Unblocked'});
    }catch (err) {
        throw new Error(err);
    }
})

// Update Password
const updatePassword = asyncHandler(async (req, res) => {
    const {id} = req.userInfo;
    validateMongoDBId(id);
    const {password} = req.body;

    try {
        const foundUser = await User.findOne({_id: id});
        foundUser.password = password;
        const updatePwd = await foundUser.save();
        res.json(updatePwd);
    }catch (err) {
        throw new Error(err);
    }
})

module.exports = {
    createUser, 
    loginUser,
    handleRefreshToken,
    logoutUser,
    getAllUsers,
    getUser,
    deleteUser,
    blockUser,
    unBlockUser,
    updatePassword
}