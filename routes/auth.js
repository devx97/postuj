const express = require('express')
const {body} = require('express-validator/check')

const User = require('../models/User')

const router = express.Router()

const authController = require('../controllers/auth')

router.put('/register',
    [
      body('name').trim().not().isEmpty(),
      body('email').isEmail().withMessage('Please enter a valid email.')
      .custom(email => {
            return User.findOne({email})
            .then(userDoc => {
              if (userDoc) {
                return Promise.reject('Email address already exists.')
              }
            })
          }
      )
      .normalizeEmail(),
      body('password').trim().isLength({min: 6, max: 50}).withMessage('Password must contain at least 6 characters.')
    ],
    authController.register
)

router.post('/login', authController.login)
module.exports = router