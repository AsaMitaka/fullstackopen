const express = require('express');
const route = express.Router();
const { loginPost } = require('../controllers/login');

route.post('/', loginPost);

module.exports = route;
