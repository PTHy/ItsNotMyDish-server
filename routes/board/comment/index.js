const controller = require('./comment.controller');
const router = require('express').Router();
const authMiddleware = require('./../../../middlewares/auth/verify');

router.get('/:board_idx',controller.getComments);
router.post('/:board_idx',authMiddleware,controller.createComment);

module.exports = router