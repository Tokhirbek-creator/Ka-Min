const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models/index');

router.route('/signin')
  .get((req, res) => {
    res.render('signin');
  })
  .post(async (req, res) => {
    const { email, password, name } = req.body;
    // console.log(req.body);
    if (email && password && (name === '')) {
      const curentUser = await User.findOne({ where: { email } });
      if (curentUser && await bcrypt.compare(password, curentUser.password)) {
        req.session.user = { id: curentUser.id, name: curentUser.name };
        return res.redirect('/');
      }
      res.redirect('/user/signin');
    } else {
      // console.log(req.body);
      const secretPass = await bcrypt.hash(password, Number(process.env.ROUNDS));
      try {
        const newUser = await User.create({ ...req.body, password: secretPass });
        req.session.user = { id: newUser.id, name: newUser.name };
        res.redirect('/');
      } catch (error) {
        console.log(error);
        res.redirect('/user/signin');
      }
    }
  });

router.route('/logout')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie('cookieId').redirect('/');
  });

module.exports = router;
