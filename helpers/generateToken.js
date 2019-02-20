const jwt = require('jsonwebtoken')

module.exports = (userId, username) => jwt.sign({
      userId,
      username,
    },
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_TTL})