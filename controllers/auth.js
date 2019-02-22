const bcrypt = require('bcryptjs')
const sha256 = require('sha256')
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')

const Token = require('../models/Token')
const User = require('../models/User')

const generateToken = require('../helpers/generateToken')

// noinspection JSUnresolvedVariable
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.register = async (req, res, next) => {
  const {username, email, password} = req.body
  try {
    // noinspection JSUnresolvedFunction
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
  const {password} = req.body
  try {
    const user = req.user
    // noinspection JSUnresolvedFunction
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      return res.status(422).json({
        message: 'Validation failed, entered data is incorrect.',
        errors: {password: 'Wrong Password.'}
      })
    }

    const token = generateToken(user._id, user.username)
    const tokenSession = new Token(
        {userId: user._id, jwt_hash: sha256(token)})
    await tokenSession.save()

    res.setHeader('jwt', token.toString())
    res.status(200).json({token, user: {_id: user._id, username: user.username}})

  } catch (err) {
    next(err)
  }
}

exports.logOut = async (req, res, next) => {
  try {
    const token = req.get('Authorization').split(' ')[1]
    await Token.findOneAndRemove({jwt_hash: sha256(token)})
  } catch (err) {
  }
  res.setHeader('Access-Control-Expose-Headers', '')
  return res.json({message: 'Logged out', success: true})
}

exports.token = async (req, res) =>
    res.json({
      user: {_id: req.userId, username: req.username},
      message: 'Authorized!',
      success: true
    })

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = req.user
    const resetToken = generateToken(user._id, user.username)
    const msg = {
      to: req.body.email,
      from: 'mail@postuj.pl',
      subject: 'Postuj.pl - Password reset',
      text: 'If it\'s not you, someone is trying to reset your password.',
      html: `<strong>Reset token: <a href="http://localhost:3000/reset-password/${resetToken}">link</a></strong>`,
    }
    // noinspection JSIgnoredPromiseFromCall
    sgMail.send(msg)
    res.json({test: 'xD'})
  } catch (err) {
    next(err)
  }
}

exports.resetPassword = async (req, res, next) => {
  const {resetToken, newPassword} = req.body
  try {
    // noinspection JSUnresolvedVariable
    const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET)
    const user = await User.findOne({_id: decodedToken.userId})
    // noinspection JSUnresolvedFunction
    user.password = await bcrypt.hash(newPassword, 12)
    await user.save()
    await Token.deleteMany({userId: decodedToken.userId})

    res.json({success: true})
  } catch (err) {
    next(err)
  }
}
