const routes = require('express').Router();
const user = require('./user');
const board = require('./board');

routes.use('/user',user)
routes.use('/board', board);

module.exports = routes;