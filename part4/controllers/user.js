const User = require('../model/user');
const bcrypt = require('bcryptjs');

const userGet = async (req, res) => {
  const users = await User.find({}).populate('notes', { content: 1 });

  res.json(users);
};

const userPost = async (req, res) => {
  const { username, name, password } = req.body;
  const salt = 10;

  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    name,
    password: passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

module.exports = { userGet, userPost };
