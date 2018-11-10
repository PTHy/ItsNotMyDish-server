const router = require('express').Router();
const controller = require('./user.controller')
const authMiddleware = require('./../../middlewares/auth/verify')

router.post('/register', controller.register);
router.post('/login',controller.login);
router.get('/:user_id',controller.getUser);
// router.put('/',authMiddleware, controller.updateUserInfo);

module.exports = router
