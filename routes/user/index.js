const router = require('express').Router();
const controller = require('./user.controller')
const authMiddleware = require('./../../middlewares/auth/verify')

router.get('/profile/:user_id',controller.getUser);
router.get('/profile', authMiddleware,controller.getMyProfile);
router.post('/register', controller.register);
router.post('/login',controller.login);
// router.put('/',authMiddleware, controller.updateUserInfo);

module.exports = router
