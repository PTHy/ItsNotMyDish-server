const routes = require('express').Router();
const user = require('./user');
const board = require('./board');
const log = require('./log');
const upload = require('./upload');


routes.use('/user',user)
routes.use('/board', board);
routes.use('/log',log);
routes.use('/upload',upload);

module.exports = routes;