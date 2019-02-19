const jwt = require('jsonwebtoken')
const sha256 = require('sha256')
const Token = require('../models/Token')

module.exports = (req, res, next) => {
  if (!req.get('Authorization') || req.get('Authorization') === 'null') {
    const err = new Error('Not authenticated.')
    err.statusCode = 401
    throw err
  }
  const token = req.get('Authorization').split(' ')[1]
  try {
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET,
        {clockTimestamp: jwt.decode(token).iat})
    if (decodedToken.exp >= Date.now() / 1000) { // if token exp time is valid
      req.userId = decodedToken.userId
      req.userName = decodedToken.name
      next()
    } else if ((Date.now() / 1000) - decodedToken.exp > 2 * 60 * 60) { // if token exp time is higher than 2 weeks remove token and 401 unauthorized
      Token.deleteOne({jwt_hash: sha256(token)}) // useless, just delete this from db
      .catch(console.log)
      .finally(() => {
        const err = new Error('Token expired. Log in to continue.')
        err.logout = true
        err.statusCode = 401
        next(err)
      })
    } else { // if token need to be refreshed
      Token.findOne({jwt_hash: sha256(token)})
      .then(DBtoken => {
        if (!DBtoken) {
          return Token.deleteMany({userId: decodedToken.userId})
          .then(result => {
            const err = new Error(
                'Someone may be using your account. Change password.')
            err.logout = true
            err.statusCode = 401
            return next(err)
          })
          .catch(err => {
            next(err)
          })
        }
        const token = jwt.sign({
              userId: decodedToken.userId,
              name: decodedToken.name
            },
            process.env.JWT_SECRET,
            {expiresIn: '10s'} // beware of auth controller too
        )
        const newToken = new Token({
          userId: decodedToken.userId,
          jwt_hash: sha256(token)
        })
        setTimeout(() => {
          DBtoken.remove()
          .catch(err => {
            throw err
          })
          .finally(() => newToken.save())
        }, 1000)
        res.setHeader('jwt', token)
        req.userId = decodedToken.userId
        req.userName = decodedToken.name
        next()
      })
      .catch(err => {
        throw err
      })
    }
  } catch (err) {
    throw err
  }
}