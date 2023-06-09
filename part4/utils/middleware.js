const logger = require('logger');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../model/user');

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(401).json({ error: 'Token missing' });
  }
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token is expired',
    });
  }

  next(error);
};

const userExtractor = async (req, res, next) => {
  const token = req.token;
  if (!token) {
    return res.status(401).json({ error: 'token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, config.JWTSECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'invalid token' });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' });
  }
};

module.exports = { errorHandler, userExtractor, ensureToken };
