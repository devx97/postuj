const {body} = require('express-validator/check')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.usernameValidator =
    usernameFieldName => body(usernameFieldName).trim().not().isEmpty()
    .isLength({min: 4, max: 32})
    .withMessage("Username must contain 4 to 32 characters.")
    .custom(username =>
        /^[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*[a-zA-Z0-9]$/.test(username))
    .withMessage("Invalid username.")

exports.usernameTakenValidator = usernameFieldName =>
    body(usernameFieldName).trim().not().isEmpty()
    .custom(username =>
        User.findOne({username: {$regex: new RegExp(username, 'i')}})
        .then(userDoc => userDoc
            ? Promise.reject('Username is taken already.')
            : true
        ))

exports.emailValidator = emailFieldName => body(emailFieldName).trim().isEmail()
.withMessage('Please enter a valid email.')
.normalizeEmail()
.isLength({min: 6, max: 64})
.withMessage("Email must contain 6 to 64 characters.")

exports.passwordValidator = passwordFieldName => body(passwordFieldName).trim()
.isLength({min: 6, max: 64})
.withMessage('Password must contain 6 to 64 characters.')

exports.emailExistsValidator = emailFieldName => body(emailFieldName)
.custom((email, {req}) => User.findOne({email}).then(user => {
  if (!user) {
    return Promise.reject('Email adress not found.')
  }
  req.user = user
}))

exports.emailTakenValidator = emailFieldName => body(emailFieldName)
.custom(email => User.findOne({email}).then(user =>
    user ? Promise.reject('Email is taken already.') : true
))

exports.passwordsMatchValidator = (passFieldName, anotherPassFieldName) => body(
    passFieldName)
.custom((pass, {req}) =>
    pass !== req.body[anotherPassFieldName]
        ? Promise.reject('Passwords have to match')
        : true
)

exports.tokenValidator = (tokenFieldName) => body(tokenFieldName)
.custom(resetToken => {
  try {
    jwt.verify(resetToken, process.env.JWT_SECRET)
    return true
  } catch (err) {
    return Promise.reject('Token expired or invalid.')
  }
})