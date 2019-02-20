const {validationResult} = require('express-validator/check')
const bcrypt = require('bcryptjs')
const sha256 = require('sha256')

const Token = require('../models/Token')
const User = require('../models/User')

const generateToken = require('../helpers/generateToken')
const submissionErrorFormatter = require('../helpers/submissionErrorFormatter')

exports.register = async (req, res, next) => {
  const errors = validationResult(req).formatWith(submissionErrorFormatter)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect.',
      errors: errors.mapped()
    })
  }

  const {username, email, password} = req.body
  try {
    const hashedPw = await bcrypt.hash(password, 12)
    const user = new User({
      username,
      email,
      password: hashedPw
    })
    const result = await user.save()
    res.status(201).json({message: 'User created!', userId: result._id})
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({email})
    if (!user) {
      return res.status(422).json({
        message: 'Validation failed, entered data is incorrect.',
        errors: {email: 'Email not found.'}
      })
    }

    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      return res.status(422).json({
        message: 'Validation failed, entered data is incorrect.',
        errors: {password: 'Wrong Password.'}
      })
    }

    const token = generateToken(user._id, user.username)
    const tokenSession = new Token(
        {userId: user._id.toString(), jwt_hash: sha256(token)})
    await tokenSession.save()

    res.setHeader('jwt', token.toString())
    res.status(200).json(
        {token, user: {_id: user._id, username: user.username}})

  } catch (err) {
    next(err)
  }
}

exports.logOut = async (req, res, next) => {
  if (!req.get('Authorization') && req.get('Authorization').split(' ')[1]) {
    const token = req.get('Authorization').split(' ')[1]
    Token.findOneAndRemove({jwt_hash: sha256(token)})
    .catch(err => {
      console.log(err)
    })
  }
  res.setHeader('Access-Control-Expose-Headers', '')
  return res.json({message: 'Logged out', success: true})
}

exports.token = async (req, res, next) => {
  try {
    // const user = await User.findById(req.userId)
    // .select('_id name')
    return res.json({
      user: {_id: req.userId, username: req.username},
      message: 'Authorized!',
      success: true
    })
  } catch (err) {
    console.log(err);
    next(err)
  }
}
