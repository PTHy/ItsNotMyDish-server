const Router = require('express').Router();
const routes = new Router();
const user = require('./user');

routes.use('/user',user)