const models = require('../../models');
const distance = require('gps-distance');

exports.getBoardList = async (req, res) => {
  const { lat, lng } = req.params;
  const { memberId } = req.data;

  const boards = await models.Board.findAll({});

  let sendData = [];
  const setDistance = new Promise((resolve, reject) => {
    try {
      for(let board in boards) {
        board.distance = distance(lat, lng, board.lat, lng)
        sendData.push(board);
      }
      resolve();
    } catch (error) {
      console.log(error.message);
      reject();
    }
  });

  Promise.all([setDistance])
  .then(() => {
    res.json({
      status: 200,
      message: "보드리스트를 불러오는데 성공하였습니다",
      data: sendData,
    });
  })
}

exports.createBoard = async (req, res) => {
  const { userId } = req.decoded;
  const { content, dish_image, lat, lng } = req.data;

  try {
    models.Board.create({
      content,
      user_id: userId,

    })
  }
}
