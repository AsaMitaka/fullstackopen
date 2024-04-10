const userRouter = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);

  if (username.length > 3)
    return res.status(403).json({ message: 'Username must be at least 3 characters' });
  if (password.length > 3)
    return res.status(403).json({ message: 'Username must be at least 3 characters' });

  const user = new User({
    username,
    name,
    password: passwordHash,
  });

  const savedUser = await user.save();

  return res.status(200).json(savedUser);
});

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs');

  return res.status(200).json(users);
});

module.exports = userRouter;
