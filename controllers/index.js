const router = require('express').Router();
const apiRoute = require('./api');
const homepage= require('./homepage');

router.use('/api', apiRoute);
router.use('/', homepage);

module.exports = router;