const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const verifyMiddleware = (req, res, next) => {

  if (!req.headers['x-access-token']) {
    return res.send({
      Code: 0,
      Desc: 'not logged in'
    });
  }

  const verify = new Promise(
    (resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(err)
        resolve(decoded)
      })
    }
  )

  const onError = (error) => {
    res.send({
      Code: 1,
      Desc: error.message
    })
  }

  //decoded에 idx에 user의 idx값 저장됨

  verify.then((decoded) => {
    req.decoded = decoded
    next()
  }).catch(onError)
}

module.exports = verifyMiddleware
