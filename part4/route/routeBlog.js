const express = require('express');
const route = express.Router();

const { getBlog, postBlog } = require('../controllers/blog');

route.get('/blogs', getBlog);
route.post('/blogs', postBlog);

module.exports = route;
