const jwt = require('jsonwebtoken')

module.exports = (userId, name) => jwt.sign({
      userId,
      name,
    },
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_TTL})