const router = require('express').Router();
const controller = require('./log.controller');
const authMiddleware = require('./../../middlewares/auth/verify');

router.get('/',authMiddleware, controller.getLog)
router.post('/',authMiddleware, controller.createLog)

module.exports = router