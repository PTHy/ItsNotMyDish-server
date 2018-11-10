const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');


// sequelize 연결 설정

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
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
    console.log(`file : ${file} model : ${model}`);
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

// 스키마 동기화
// sequelize.sync({ force: true }).then(() => {
//   console.log('Schema is synchronized');
// }).catch((err) => {
//   console.log('An error has occurred: ', err);
// });

models.sequelize = sequelize;
models.Sequelize = sequelize;

module.exports = models;