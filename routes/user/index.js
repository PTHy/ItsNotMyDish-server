const router = require('express').Router();
const controller = require('./user.controller')
const authMiddleware = require('./../../middlewares/auth/verify')

router.get('/:user_id',controller.getUser);
router.post('/register', controller.register);
router.post('/login',controller.login);
// router.put('/',authMiddleware, controller.updateUserInfo);

module.exports = router
