const models = require('../../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.register = async (req, res) => {

  /*
    POST localhost:3000/user/register 
    BODY id, password, name, email, lat, lng
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

  const isExist = await models.User.findByPk(data.id);

  if (!isExist) {
    res.status(404).json({
      status: 404,
      message: "유저가 존재하지 않습니다",
    });

    return;
  }

  data.password = await EncryptPassword(data.password);

  const user = await models.User.login(data)
  
  if(!user) {
    res.status(400).json({
      status: 400,
      message: "비밀번호가 올바르지 않습니다",  
    });

    return;
  }
  const secret = process.env.SECRET;

  try {
    const token = await  jwt.sign({
                          _id : user._id,
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
      token
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "알수없는 오류",
    })
  }
}
