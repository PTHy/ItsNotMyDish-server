const models = require('../../../models');
const changeCase = require('change-object-case');

/*
  GET localhost:3000/board/comment/:board_idx
*/

exports.getComments = async (req, res) => {
  console.log(req.params);
  const { board_idx } = req.params
  
  const board = await models.Board.getBoard(board_idx);

  if(!board) {
    res.status(404).json({
      status: 404,
      message: "보드가 존재하지않습니다",
    })

    return;
  }

  try {
    const comments = await models.Comments.getComments(board_idx);

    res.json({
      status: 200,
      message: "댓글이 조회되었습니다",
      data: comments,
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "댓글 조회에 실패하였습니다",
    })
  }
}

/*
  POST localhost:3000/board/comment/:board_idx
  BODY content, dish_image
*/

exports.createComment = async (req, res) => {
  const { boardIdx } = changeCase.camelKeys(req.params);
  const { userId } = changeCase.camelKeys(req.decoded);
  const data = req.body;
  const board = await models.Board.getBoard(boardIdx);

  data.boardIdx = await boardIdx
  data.userId = await userId


  if(!board) {
    res.status(404).json({
      status: 404,
      message: "보드가 존재하지않습니다",
    });

    return;
  }

  try {
    const newComment = await models.Comments.create(data);

    res.json({
      status: 200,
      message: "댓글이 작성되었습니다",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "댓글 작성에 실패하였습니다",
    });
  }
}