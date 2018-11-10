const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const verifyMiddleware = (req, res, next) => {

  if (!req.headers['x-access-token']) {
    return res.status(404).json({
      status: 404,
      message: "토큰이 없습니다"
    });
  }

  const token = req.headers["x-access-token"]

  const verify = new Promise(
    (resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(err)
        resolve(decoded)
      })
    }
  )

  const onError = (error) => {
    res.status(500).json({
      status: 500,
      Message: "토큰검증에서 오류가 발생하였습니다"
    })
  }

  //decoded에 idx에 user의 idx값 저장됨

  verify.then((decoded) => {
    req.decoded = decoded
    next()
  }).catch(onError)
}

module.exports = verifyMiddleware
