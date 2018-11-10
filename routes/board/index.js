const controller = require('./board.controller');
const routes = require('express').Router();

routes.use('/:board_idx/comment');
routes.get('/:lat/:lng',controller.getBoardList);
routes.post('/',controller.createBoard);


module.exports = routes