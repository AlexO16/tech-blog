const router = require('express').Router();
const apiRoute = require('./api');
const postRoutes = require('./post-routes');
const cmtRoutes = require('./comment-routes');

router.use('/api', apiRoute);
router.use('/posts', postRoutes);
router.use('/comments', cmtRoutes);

module.exports = router;