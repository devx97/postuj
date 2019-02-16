const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (!req.get('Authorization')) {
    const err = new Error('Not authenticated.')
    err.statusCode = 401
    throw err
  }
  const token = req.get('Authorization').split(' ')[1]
  let decodedToken
  try {
    decodedToken = jwt.verify(token, 'supersecretkeyxd')
  } catch (err) {
    err.statusCode = 500
    throw err
  }
  if (!decodedToken) {
    const err = new Error('Not authenticated.')
    err.statusCode = 401
    throw err
  }
  req.userId = decodedToken.userId
  next()
}