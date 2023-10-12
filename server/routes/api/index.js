const router = require('express').Router();
const { predictSalary } = require('../../dao');
const userRoutes = require('./user-routes');

router.use('/user', userRoutes);
router.route('/predictsalary').post(predictSalary)

module.exports = router;