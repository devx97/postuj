const generateToken = require('../helpers/generateToken')

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

exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
      const err = new Error()
      err.data = [{param: 'email', msg: 'Email not found.'}]
      err.statusCode = 401
      return next(err)
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      const err = new Error()
      err.data = [{param: 'password', msg: 'Wrong password.'}]
      err.statusCode = 401
      return next(err)
    }
    const token = generateToken(user._id, user.name)
    const tokenSession = new Token({userId: user._id.toString(), jwt_hash: sha256(token)})
    await tokenSession.save()
    res.setHeader('jwt', token.toString())
    res.status(200).json({token, user: {_id: user._id, name: user.name}})
  } catch (err) {
    next(err)
  }
}

exports.logOut = async (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1]
  console.log(token);
  res.setHeader('Access-Control-Expose-Headers', '')
  res.json({message: 'Logged out', success: true})
  Token.findOneAndRemove({jwt_hash: sha256(token)})
  .catch(err => {
    console.log(err)
  })
}

exports.token = async (req, res, next) => {
  try {
    // const user = await User.findById(req.userId)
    // .select('_id name')
    return res.json({user: {_id: req.userId, name: req.name}, message: 'Authorized!', success: true})
  } catch (err) {
    console.log(err);
    next(err)
  }
}
