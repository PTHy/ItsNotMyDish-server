const models = require('../../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const changeCase = require('change-object-case');

  /*
    GET localhost:3000/user/:user_id
  */

  exports.getUser = async (req, res) => {
    const { userId } = changeCase.camelKeys(req.params);

    const user = await models.User.findByPk(userId);

    if (!user) {
      res.status(404).json({
        status: 404,
        message: "유저가 존재하지 않습니다",
      });

      return;
    }

    res.json({
      status: 200,
      message: "유저 정보가 조회되었습니다",
      data: user,
    });
  }


exports.register = async (req, res) => {

  /*
    POST localhost:3000/user/register 
    BODY id, password, name, email, lat, lng, contact
  */

  const data = req.body;
  console.log(`data: ${data}`);

  const user = await models.User.find({ id: data.id })

  if (user) {
    res.status(400).json({
      status: 400,
      message: "이미 존재하는 유저입니다",
    });

    return;
  }

  data.password = await EncryptPassword(data.password);

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
}

function EncryptPassword (password) {
  return crypto.createHash('sha512').update(password).digest('base64')
}

/*
  POST localhost:3000/user/login 
  BODY id, password
*/

exports.login = async (req,res) => {
  const data = req.body;

  const user = await models.User.findByPk(data.id);

  if (!user) {
    res.status(404).json({
      status: 404,
      message: "유저가 존재하지 않습니다",
    });

    return;
  }

  data.password = await EncryptPassword(data.password);

  const login = await models.User.login(data)
  
  if(!login) {
    res.status(400).json({
      status: 400,
      message: "비밀번호가 올바르지 않습니다",  
    });

    return;
  }
  const secret = process.env.SECRET;

  try {
    const token = await  jwt.sign({
                          userId : user.id,
                        },
                        secret,
                        {
                          expiresIn: '7d',
                          issuer: 'ItsNotMyDish',
                          subject: 'UserInfo'
                        })
    
    res.json({
      status: 200,
      message: "로그인에 성공하였습니다",
      token,
      data: user,
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "알수없는 오류",
    })
  }

  exports.updateUserInfo = async (req, res) => {
    const { userId } = req.decoded;
    const data = req.body;

    const user = await models.User.findByPk(userId);
  
    if (!user) {
      res.status(404).json({
        status: 404,
        message: "유저가 존재하지 않습니다",
      });
  
      return;
    }

    try {
      const user = models.user.update(data)

      res.json({
        status: 200,
        message: "유저 정보 수정에 성공하였습니다",
        data
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        status: 500,
        message: "유저 정보 수정에 실패하였습니다",
      });
    }
  }
}