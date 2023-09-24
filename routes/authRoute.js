const express = require('express')
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles')


const {
    createUser, 
    loginUser,
    handleRefreshToken,
    logoutUser,
    getAllUsers,
    getUser,
    deleteUser,
    blockUser,
    unBlockUser,
    updatePassword,
} 
= require('../controllers/authController');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logoutUser);
router.get('/getall',verifyJWT ,verifyRoles([2000]) , getAllUsers);
router.get('/:id', getUser);
router.delete('/:id',verifyJWT ,verifyRoles([2000]), deleteUser);
router.put('/block/:id',verifyJWT ,verifyRoles([2000]) , blockUser);
router.put('/unblock/:id',verifyJWT ,verifyRoles([2000]) , unBlockUser);
router.put('/updatepwd',verifyJWT, updatePassword);

module.exports = router;