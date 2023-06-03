const Blog = require('../model/blog');

const getBlog = async (req, res) => {
  await Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
};

const postBlog = async (req, res) => {
  const blog = new Blog(request.body);

  await blog.save().then((result) => {
    response.status(201).json(result);
  });
};

module.exports = { getBlog, postBlog };
