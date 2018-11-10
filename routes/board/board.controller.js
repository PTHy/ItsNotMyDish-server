const models = require('../../models');

exports.getBoardList = async (req, res) => {
  const { memberId } = req.data;
  const boards = await models.Board.findAll({});
} 