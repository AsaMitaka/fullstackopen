const express = require('express');
const route = express.Router();

const { userGet, userPost } = require('../controllers/user');

route.get('/', userGet);
route.post('/', userPost);

module.exports = route;
