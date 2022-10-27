const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.post_title,
            post_text: req.body.post_text,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    };
});

router.get('/:id', async (req, res) => {
    try {
        const livePost = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Comment,
                attributes: ['id', 'user_id', 'post_id', 'comment_id']
            }]
        });
        if (livePost) {
            res.status(200).json(livePost)
        } else {
            res.status(400).json({ message: "No post found with this id" })
        };
    } catch (err) {
        res.status(500).json(err);
    };
});

router.put('/:id', async (req, res) => {
    try {
        const editPost = await Post.update({
            title: req.body.post_title,
            post_text: req.body.post_text,
            user_id: req.session.user_id,
        },
        {
            where: {
                id: req.params.id
            }
        });
        if (editPost) {
            res.status(200).json(editPost)
        } else {
            res.status(400).json({ message: "No post found with this id" })
        };
    } catch (err) {
        res.status(500).json(err);
    };
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;