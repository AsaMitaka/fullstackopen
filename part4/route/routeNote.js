const express = require('express');
const route = express.Router();

const { getNote, postNote } = require('../controllers/note');

route.get('/', getNote);
route.post('/', postNote);

module.exports = route;
