const express = require('express')
const {body} = require('express-validator/check')

const User = require('../models/User')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

const authController = require('../controllers/auth')

const {usernameValidator, emailValidator, passwordValidator} = require(
    '../helpers/validators')

router.put('/register',
    [
      usernameValidator('username')
      .custom(username =>
          User.findOne({username: {$regex: new RegExp(username, 'i')}})
          .then(userDoc => {
                if (userDoc) {
                  return Promise.reject('Username is taken already.')
                }
              }
          )),
      emailValidator('email')
      .custom(email =>
          User.findOne({email})
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('Email is taken already.')
            }
          })
      ),
      passwordValidator('password'),
      passwordValidator('password2')
      .custom((password2, {req}) => {
        if (password2 !== req.body.password) {
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
      emailValidator('email')
      .custom((email, {req}) => User.findOne({email}).then(user => {
            if (!user) {
              return Promise.reject('Email adress not found.')
            }
            req.user = user
          })
      ),
      passwordValidator('password')
    ],
    authController.login
)

router.post('/forgot-password',
    [
      emailValidator('email')
      .custom((email, {req}) => User.findOne({email}).then(user => {
        if (!user) {
          return Promise.reject('Email adress not found.')
        }
        req.user = user
      }))
    ],
    authController.forgotPassword)

router.post('/reset-password',
    [
      passwordValidator('password'),
      passwordValidator('password2')
      .custom((password2, {req}) => {
        if (password2 !== req.body.password) {
          return Promise.reject('Passwords have to match')
        }
      })
    ],
    authController.resetPassword)

router.get('/logout', authController.logOut)

router.get('/token', isAuth, authController.token)

module.exports = router