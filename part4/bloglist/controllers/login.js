const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const isUserExist = await User.findOne({ username });
  if (!isUserExist) return res.status(404).json({ message: 'User not found' });

  const isPasswordCorrect = await bcrypt.compare(password, isUserExist.passwordHash);

  if (!isPasswordCorrect)
    return res.status(404).json({ message: 'Password or username incorrect' });

  const userToken = {
    username: isUserExist.username,
    id: isUserExist._id,
  };

  const token = jwt.sign(userToken, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 });

  return res
    .status(200)
    .json({ token, username: isUserExist.username, password: isUserExist.password });
});

module.exports = loginRouter;
