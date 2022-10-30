const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        //console.log(req.session.userId)
        const postData = await Post.findAll({
            where: {
                user_id: req.session.userId
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts)
        res.render('dashboard', {
            posts,
        });

    } catch (err) {
        console.log(err)
        //res.redirect('login');
    }
});

module.exports = router;