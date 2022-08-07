const express = require('express');

const middlewareError = require('./middlewares/error');
const user = require('./routes/users');
const auth = require('./routes/auth');
const category = require('./routes/categories');
const post = require('./routes/posts');

const app = express();

app.use(express.json());
app.use('/login', auth);
app.use('/user', user);
app.use('/categories', category);
app.use('/post', post);

app.use(middlewareError);

module.exports = app;
