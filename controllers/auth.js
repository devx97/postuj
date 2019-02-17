const {validationResult} = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.register = (req, res, next) => {
  const errors = validationResult(req)
  console.log(errors.array());
  if (!errors.isEmpty()) {
    const err = new Error('Validation failed.')
    err.statusCode = 422;
    err.data = errors.array()
    throw err
  }
  const {name, email, password} = req.body
  bcrypt.hash(password, 12)
  .then(hashedPw => {
    const user = new User({
      name,
      email,
      password: hashedPw
    })
    return user.save()
  })
  .then(result => {
    res.status(201).json({message: 'User created!', userId: result._id})
  })
  .catch(next)
}

exports.login = (req, res, next) => {
  const {email, password} = req.body
  console.log(email, password)
  User.findOne({email})
  .then(user => {
    if (!user) {
      const err = new Error()
      err.data = [{param: 'email', msg: 'Email not found.'}]
      err.statusCode = 401
      throw err
    }
    bcrypt.compare(password, user.password)
    .then(isEqual => {
      if (!isEqual) {
        const err = new Error()
        err.data = [{param: 'password', msg: 'Wrong password.'}]
        err.statusCode = 401
        throw err
      }
      const token = jwt.sign({
            userId: user._id.toString(),
            name: user.name
          },
          'supersecretkeyxd',
          {expiresIn: '1h'}
      )
      return res.status(200).json({token, userId: user._id.toString()})
    })
    .catch(next)
  })
  .catch(next)
}

exports.refreshToken = (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1]
  const decodedToken = jwt.verify(token, 'supersecretkeyxd')
  const newToken = jwt.sign({
        userId: decodedToken.userId,
        name: decodedToken.name
      },
      'supersecretkeyxd',
      {expiresIn: '1h'}
  )
  return res.status(200).json({token: newToken, userId: decodedToken.userId})
}