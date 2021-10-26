const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getUserMe,
} = require('../controllers/users');
const {
  validateUpdateMe,
  validateUserById,
  validateUpdateMeAvatar,
} = require('../middlewares/validations')

router.get('/users', getUsers);
router.get('/users/me', getUserMe);
router.get('/users/:userId', validateUserById, getUser);

router.patch('/users/me', validateUpdateMe, updateUser);

router.patch('/users/me/avatar', validateUpdateMeAvatar, updateUserAvatar);

module.exports = router;