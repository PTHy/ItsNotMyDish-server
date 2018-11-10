const models = require('../../models');
const gpsDistance = require('gps-distance');

exports.getBoardList = async (req, res) => {
  const { lat, lng } = req.params;
  const { memberId } = req.data;
  const boards = await models.Board.findAll({});
  let sendData = [];
  const setDistance = new Promise((resolve, reject) => {
    for(let board in boards) {
      
    }
  })
} 