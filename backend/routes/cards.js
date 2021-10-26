const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards');
const {
  validateNewCard,
  validateCardId,
  validateCardLike,
} = require('../middlewares/validations')

router.get('/cards', getCards);

router.post('/cards', validateNewCard, createCard);

router.delete('/cards/:_id', validateCardId, deleteCard);

router.delete('/cards/:cardId/likes', validateCardLike, dislikeCard);

router.put('/cards/:cardId/likes', validateCardLike, likeCard);

module.exports = router;