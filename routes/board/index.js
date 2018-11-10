const router = require('express').Router();
const controller = require('./board.controller');
const authMiddleware = require('./../../middlewares/auth/verify');
const comment = require('./comment');

router.use('/comment',comment);
router.get('/:lat/:lng',controller.getBoardList);
router.post('/',authMiddleware,controller.createBoard);


module.exports = router