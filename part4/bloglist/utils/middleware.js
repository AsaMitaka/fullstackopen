const getToken = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.substring(7);
    return next();
  }

  req.token = null;
  next();
};

module.exports = {
  getToken,
};
