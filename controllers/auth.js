const {validationResult} = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.register = (req, res, next) => {
  const errors = validationResult(req)
  console.log(errors.array());
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422;
    error.data = errors.array()
    throw error
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
  User.findOne({email})
  .then(user => {
    if (!user) {
      const err = new Error('Email not found.')
      err.statusCode = 401
      throw err
    }
    bcrypt.compare(password, user.password)
    .then(isEqual => {
      if (!isEqual) {
        const err = new Error('Wrong password.')
        err.statusCode = 401
        throw err
      }
      const token = jwt.sign({
            userId: user._id.toString(),
            name: user.name
          },
          'supersecretkeyxd',
          {expiresIn: '7d'}
      )
      return res.status(200).json({token, userId: user._id.toString()})
    })
    .catch(next)
  })
  .catch(next)
}