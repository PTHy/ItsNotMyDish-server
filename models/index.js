const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// sequelize 연결 설정

const config = require('../config/database');

const sequelize = new Sequelize(
  config.dbName,
  config.dbUserName,
  config.dbPassword, {
    host: config.dbHost,
    dialect: config.dialect,
    logging: true,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    timezone: 'Asia/Seoul',
  },
);

const models = [{}];

// 현재 디렉터리의 모델 파일들 불러오기
fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

// 스키마 동기화
 sequelize.sync({ force: true }).then(() => {
   console.log('Schema is synchronized');
 }).catch((err) => {
   console.log('An error has occurred: ', err);
 });

models.sequelize = sequelize;
models.Sequelize = sequelize;

module.exports = models;
