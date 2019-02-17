const express = require('express')
const {body} = require('express-validator/check')

const User = require('../models/User')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

const authController = require('../controllers/auth')

router.put('/register',
    [
      body('name').trim().not().isEmpty(),
      body('name').trim().custom(name => !/\s/.test(name))
      .withMessage('No spaces allowed in username.'),
      body('email').isEmail().withMessage('Please enter a valid email.')
      .custom(email => User.findOne({email})
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('Email address already exists.')
            }
          })
      )
      .normalizeEmail(),
      body('password').trim().isLength({min: 6, max: 50}).withMessage(
          'Password must contain at least 6 characters.'),
      body('password2').trim().isLength({min: 6, max: 50}).withMessage(
          'Password must contain at least 6 characters.'),
      body('password2').trim().custom((password2, {req}) => {
        if (password2 !== req.body.password) {
          throw 'Passwords have to match'
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

router.get('/logout', isAuth, authController.logOut)

router.get('/token', isAuth, authController.token)

module.exports = router