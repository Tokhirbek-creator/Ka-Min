const router = require('express').Router();
const { Post } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    console.log('session user', req.session.user);
    const postsOrigin = await Post.findAll({ order: [['createdAt', 'DESC']], raw: true });
    const posts = postsOrigin.map((el) => ({ ...el, owner: el.userId === req.session.user?.id }));
    res.render('index', { posts });
  });

module.exports = router;
