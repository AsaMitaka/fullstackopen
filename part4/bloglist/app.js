const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const { MONGODB_URL } = require('./utils/config');

mongoose.connect(MONGODB_URL);

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/blogs', blogRouter);

module.exports = app;
