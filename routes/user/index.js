const router = require('express').Router();
const controller = require('./user.controller')
const verifyMiddleware = require('../../middlewares/auth/verify')

router.use('/',verifyMiddleware)

module.exports = router
