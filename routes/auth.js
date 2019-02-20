const express = require('express')
const {body} = require('express-validator/check')

const User = require('../models/User')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

const authController = require('../controllers/auth')

router.put('/register',
    [
      body('username').trim().not().isEmpty(),
      body('username').trim().isLength({min: 4, max: 32})
      .withMessage("Username must contain 4 to 32 characters."),
      body('username').trim().custom(
          username => /^[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*[a-zA-Z0-9]$/.test(
              username))
      .withMessage("Invalid username."),
      body('username').trim().custom(username =>
          User.findOne({username: {$regex: new RegExp(username, 'i')}})
          .then(userDoc => {
                if (userDoc) {
                  return Promise.reject('Username is taken already.')
                }
              }
          )),
      body('email').isEmail().withMessage('Please enter a valid email.')
      .custom(email =>
          User.findOne({email})
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('Email is taken already.')
            }
          })
      )
      .normalizeEmail(),
      body('password').trim().isLength({min: 6, max: 64}).withMessage(
          'Password must contain 6 to 64 characters.'),
      body('password2').trim().isLength({min: 6, max: 64}).withMessage(
          'Password must contain 6 to 64 characters.'),
      body('password2').trim().custom((password2, {req}) => {
        if (password2.toString() !== req.body.password.toString()) {
          return Promise.reject('Passwords have to match')
        }
        return true
      })
    ],
    authController.register
)

router.post(
    '/login',
    [
      body('email').normalizeEmail()
    ],
    authController.login
)

router.get('/logout', authController.logOut)

router.get('/token', isAuth, authController.token)

module.exports = router