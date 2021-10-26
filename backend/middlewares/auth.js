const jwt = require('jsonwebtoken');
const NotAuthorization = require('../errors/NotAuthorization')

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorization('Необходима авторизация');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new NotAuthorization('Необходима авторизация');
  }

  req.user = payload;

  next();
};