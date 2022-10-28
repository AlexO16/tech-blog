const router = require('express').Router();
const apiRoute = require('./api');
const homepage= require('./homepage');
const dashboardRoutes = require('./dashboard-routes')

router.use('/api', apiRoute);
router.use('/', homepage);
router.use('/dashboard', dashboardRoutes);

module.exports = router;