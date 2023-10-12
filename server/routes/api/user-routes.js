const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');
const {
    createUser,
    updateUser,
    getMe,
    login,
    deleteUser,
    getDirectReports,
    getOneDirectRport
} = require('../../dao');

router.route('/').post(createUser).put(authMiddleware, updateUser);
router.route('/me').get(authMiddleware, getMe);
router.route('/salaries').get(authMiddleware, getDirectReports);
router.route('/salaries/:employeeID').get(authMiddleware, getOneDirectRport);
router.route('/login').post(login);
// TODO: Add auth to delete route
router.route('/:id').delete(deleteUser);

module.exports = router;