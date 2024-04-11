const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});

  return res.status(200).json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (title === undefined || url === undefined)
    return res.status(403).json({ message: 'Url or title is undefined' });

  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid',
    });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  return res.json(savedBlog);
});

module.exports = blogRouter;
