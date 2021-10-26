const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError')
const ConflictError = require('../errors/ConflictError')
const NotAuthorization = require('../errors/NotAuthorization')

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next)
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new NotFoundError('Пользователь по указанному _id не найден.'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Переданы некорректный _id'))
        return
      }
      next(err)
    })
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    throw new NotAuthorization('Отсутствует email или password!')
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        res.status(200).send(user);
      }))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('400 — Переданы некорректные данные при создании пользователя.')
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new ConflictError('Пользователь уже существет!');
      }
      next(err)
    })
    .catch(next)
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch(() => {
      throw new NotAuthorization('Вы передали неверные данные.')
    })
    .catch(next)
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь по указанному _id не найден.'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Переданы некорректные данные пользователя.')
      }
      next(err)
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { ...req.body }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Переданы некорректные данные при обновлении профиля.');
      }
      next(err)
    })
    .catch(next)
};

module.exports.updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { ...req.body }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Переданы некорректные данные при обновлении аватара!');
      }
      next(err)
    })
    .catch(next)
};