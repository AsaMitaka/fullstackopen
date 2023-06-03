const { Schema, model } = require('mongoose');

const blogSchema = Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

module.exports = model('Blog', blogSchema);
