const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    const cmt = await Comment.findAll({});
    res.json(cmt);
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newCmt = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });

        res.status(200).json(newCmt);
    } catch (err) {
        res.status(400).json(err);
    };
});

router.put('/:id', async (req, res) => {
    try {
        const editCmt = await Comment.update({
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
        });
        if (editCmt) {
            res.status(200).json(editCmt)
        } else {
            res.status(400).json({ message: "No comment found with this id" })
        };
    } catch (err) {
        res.status(500).json(err);
    };
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const cmtData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!cmtData) {
            res.status(404).json({ message: "No comment found with this id" });
            return;
        }

        res.status(200).json(cmtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;