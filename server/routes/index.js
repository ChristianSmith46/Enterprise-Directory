const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');

router.use('/api', apiRoutes);
router.get('/*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../client/build') });
});

module.exports = router;