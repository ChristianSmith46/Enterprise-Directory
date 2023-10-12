const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');
const {
    createUser,
    updateUser,
    getMe,
    login,
    deleteUser,
    getDirectReports,
    getOneDirectReport,
    searchBy
} = require('../../dao');

router.route('/').post(createUser).put(authMiddleware, updateUser);
router.route('/me').get(authMiddleware, getMe);
router.route('/salaries').get(authMiddleware, getDirectReports);
router.route('/salaries/:employeeID').get(authMiddleware, getOneDirectReport);
router.route('/login').post(login);
router.route('/:id').delete(authMiddleware, deleteUser);
router.route('/lookup').get(authMiddleware, searchBy);

module.exports = router;