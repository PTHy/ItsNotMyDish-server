const models = require('../../models');

/*
  GET localhost:3000/log
*/

exports.getLog = async (req, res) => {
  const { userId } = req.decoded;

  try{
    const log = models.Log.getLog(userId);

    if (!log) {
      res.status(404).json({
        status: 404,
        message: "로그가 없습니다",
      });
    }

    res.json({
      status: 200,
      message: "로그가 조회되었습니다",
      data: log
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "로그 조회 실패"
    })
  }
}

/*
  POST localhost:3000/log
*/

exports.createLog = async (req,res) => {
  const data = req.body;

  try{
    models.Log.create(data);

    models.Board.soldOut(data.boardIdx);

    res.json({
      status: 200,
      message: "로그 생성에 성공했습니다"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "로그 생성에 실패했습니다"
    });
  }
}