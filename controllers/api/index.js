const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
//const cmtRoutes = require('./comment-routes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
//router.use('/comment', cmtRoutes);

module.exports = router;