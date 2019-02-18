const {validationResult} = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sha256 = require('sha256')

const User = require('../models/User')
const Token = require('../models/Token')

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
          {expiresIn: '30m'} // beware of isAuth too
      )
      const tokenM = new Token({
        userId: user._id.toString(),
        jwt_hash: sha256(token),
      })
      return tokenM.save()
      .then(result => res.status(200).json({token, user: {name: user.name, email: user.email}}))
      .catch(next)
    })
    .catch(next)
  })
  .catch(next)
}

exports.logOut = (req, res, next) => {
  res.setHeader('jwt', null)
  const token = req.get('Authorization').split(' ')[1]
  Token.findOneAndRemove({jwt_hash: sha256(token)})
  .catch(err => {
    throw err
  })
  .finally(() => res.json({message: 'Logged out', success: true}))
}

exports.token = (req, res, next) => {
  User.findById(req.userId)
  .select('name email -_id')
  .then(user => {
    return res.status(200).json({user, message: 'Authorized!', success: true})
  })
  .catch(err => {
    throw err
  })
}
