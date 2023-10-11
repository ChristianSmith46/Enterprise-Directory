const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');
const {
    createUser,
    login
} = require('../../dao');

router.route('/').post(createUser).put(authMiddleware, updateUser);

router.route('/login').post(login);

module.exports = router;