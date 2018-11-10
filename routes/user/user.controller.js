const models = require('../../models');
const changeCase = 

exports.register = async (req, res) => {
  const data = req.body;
  console.log(`data: ${data}`);

  const user = await models.User.find({ id })

  if (user) {
    res.status(500).json({
      status: 500,
      message: "이미 존재하는 유저입니다",
    })
  }

  try {
    models.User.create(data);
    res.json({
      status: 200,
      messge: "회원가입이 되었습니다",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      status: 500,
      message: "회원가입 오류",
    });
  }

  exports.login = async (req,res) => {
    const { id, password, ...data } = req.body;

    const user = await models.User.find({ id });
  }
  
}