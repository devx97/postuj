const jwt = require('jsonwebtoken')
const sha256 = require('sha256')
const Token = require('../models/Token')
const generateToken = require('../helpers/generateToken')

module.exports = async (req, res, next) => {
  if (!req.get('Authorization') || req.get('Authorization') === 'null') {
    const err = new Error('Not authenticated.')
    err.statusCode = 401
    throw err
  }
  const jwtoken = req.get('Authorization').split(' ')[1]
  try {
    let decodedToken = jwt.verify(jwtoken, process.env.JWT_SECRET,
        {clockTimestamp: jwt.decode(jwtoken).iat})
    if (decodedToken.exp >= Date.now() / 1000) { // if jwtoken exp time is valid
      req.userId = decodedToken.userId
      req.userName = decodedToken.name
      next()
    } else if ((Date.now() / 1000) - decodedToken.exp > 2 * 60 * 60) { // if jwtoken exp time is higher than 2 weeks remove jwtoken and response 401 unauthorized
      // useless token, just delete this from db, probably will remove itself with mongoose expire_at but its better to check
      await Token.deleteOne({jwt_hash: sha256(jwtoken)})
      const err = new Error('Token haven\'t used in 2 weeks')
      err.statusCode = 401
      next(err)
    } else { // if jwtoken need to be refreshed
      const DBtoken = await Token.findOne({jwt_hash: sha256(jwtoken)})

      // if DBtoken is not found in database that means someone used this token already (could be hacker)
      // or user changed password and all his tokens were deleted
      // in both cases sending 401 unauthorized with warning
      if (!DBtoken) {
        await Token.deleteMany({userId: decodedToken.userId})
        const err = new Error(
            'Logged out. If you haven\'t changed your password in few minutes someone could steal and use your token. In this case we recommend resetting password so all your tokens will be invalidated.')
        err.statusCode = 401
        return next(err)
      }
      const token = generateToken(decodedToken.userId, decodedToken.name)

      // creating new token and removing old one, 1 sec window because sometimes user can send 2 requests at once
      // so if in first request token would be deleted in second one wouldn't work and user probably would be logged out
      const newToken = new Token({
        userId: decodedToken.userId,
        jwt_hash: sha256(token)
      })
      setTimeout(async () => {
        try {
          DBtoken.remove()
          newToken.save()
        } catch (err) {
          console.log(err);
        }
      }, 1000)

      // setting header so frontend can handle this
      res.setHeader('jwt', token)
      req.userId = decodedToken.userId
      req.userName = decodedToken.name
      next()
    }
  } catch (err) {
    next(err)
  }
}