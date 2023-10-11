const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');
const {
    createUser,
    updateUser,
    getMe,
    login,
    deleteUser
} = require('../../dao');

router.route('/').post(createUser).put(authMiddleware, updateUser).delete(deleteUser);
router.route('/me').get(authMiddleware, getMe);
// router.route('/salaries').get(authMiddleware, getSalaries);

router.route('/login').post(login);

module.exports = router;