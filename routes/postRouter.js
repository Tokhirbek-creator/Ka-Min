const router = require('express').Router();
const upload = require('../middleware/uploadMiddle');
const { Post } = require('../db/models');
const { checkUser } = require('../middleware/userMiddle');

router.route('/')
  .post(upload.single('img'), async (req, res) => {
    const newPost = await Post.create(
      { ...req.body, img: req.file.filename, userId: req.session.user.id },
    );
    res.json({ newPost });
  });

router.route('/:id')
  .delete(checkUser, async (req, res) => {
    await Post.destroy({ where: { id: req.params.id } });
    res.sendStatus('200');
  })
  .put(checkUser, async (req, res) => {
    const {
      title, body, img, id,
    } = req.body;
    try {
      await Post.update({ title, body, img }, { where: { id } });
    } catch (error) {
      console.log(error.message);
    }
    res.render('editPost');
  });
module.exports = router;
