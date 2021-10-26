const Card = require('../models/card')
const ValidationError = require('../errors/ValidationError')
const NotFoundError = require('../errors/NotFoundError')
const ForbiddenError = require('../errors/ForbiddenError')

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next)
};

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при создании карточки.');
      }
      next(err)
    })
    .catch(next)
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(() => new NotFoundError('404 — Передан несуществующий _id карточки.'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Карточка не принадлежит вам!');
      }
      Card.findByIdAndRemove(req.params._id)
        .then((data) => res.status(200).send(data))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new ValidationError('400 - Переданы некорректные данные для постановки/снятии лайка.');
      }
      next(err)
    })
    .catch(next)
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId, {
      $addToSet: { likes: req.user._id },
    }, { new: true },
  ).orFail(() => { throw new NotFoundError('404 — Передан несуществующий _id карточки.') })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new ValidationError('400 - Переданы некорректные данные для постановки/снятии лайка.');
      }
      next(err)
    })
    .catch(next)
}

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId, {
      $pull: { likes: req.user._id },
    }, { new: true },
  ).orFail(() => { throw new NotFoundError('404 — Передан несуществующий _id карточки.') })
    .then((card) => {
      res.status(200).send(card)
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new ValidationError('400 - Переданы некорректные данные для постановки/снятии лайка.');
      }
      next(err)
    })
    .catch(next)
}