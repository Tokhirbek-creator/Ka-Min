require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const morgan = require('morgan');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const { PORT } = process.env;
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'views/partials'));

app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  name: 'cookieId',
  store: new FileStore(),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
  console.log('Server up...');
});
