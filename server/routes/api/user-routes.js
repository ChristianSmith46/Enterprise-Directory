const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');
const {
    createUser,
    updateUser,
    getMe,
    login
} = require('../../dao');

router.route('/').post(createUser).put(authMiddleware, updateUser).get(getMe);

router.route('/login').post(login);

module.exports = router;