const {body} = require('express-validator/check')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.usernameValidator =
    fieldName => body(fieldName).trim().not().isEmpty()
    .isLength({min: 4, max: 32})
    .withMessage("Username must contain 4 to 32 characters.")
    .custom(username =>
        /^[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*[a-zA-Z0-9]$/.test(username))
    .withMessage("Invalid username.")

exports.usernameTakenValidator = fieldName =>
    body(fieldName).trim().not().isEmpty()
    .custom(username =>
        User.findOne({username: {$regex: new RegExp(username, 'i')}})
        .then(userDoc => userDoc
            ? Promise.reject('Username is taken already.')
            : true
        ))

exports.emailValidator = fieldName => body(fieldName).trim().isEmail()
.withMessage('Please enter a valid email.')
.normalizeEmail()
.isLength({min: 6, max: 64})
.withMessage("Email must contain 6 to 64 characters.")

exports.emailExistsValidator = fieldName => body(fieldName).trim().isEmail()
.custom((email, {req}) => User.findOne({email}).then(user =>
    user ? req.user = user : Promise.reject('Email adress not found.')
))

exports.emailTakenValidator = fieldName => body(fieldName).trim().isEmail()
.custom(email => User.findOne({email}).then(user =>
    user ? Promise.reject('Email is taken already.') : true
))

exports.passwordValidator = fieldName => body(fieldName).trim()
.isLength({min: 6, max: 64})
.withMessage('Password must contain 6 to 64 characters.')

exports.passwordsMatchValidator = (passFieldName, anotherPassFieldName) => body(
    passFieldName)
.custom((pass, {req}) =>
    pass !== req.body[anotherPassFieldName]
        ? Promise.reject('Passwords have to match')
        : true
)

// exports.tokenValidator = (fieldName) => body(fieldName)
// .custom(resetToken =>
//     jwt.verify(resetToken, process.env.JWT_SECRET)
//         ? true : Promise.reject('Token expired or invalid.')
// )
// THIS IS RETURNNG JWT ERRORS, NOT CUSTOM

exports.tokenValidator = fieldName => body(fieldName)
.custom(resetToken => {
  try {
    jwt.verify(resetToken, process.env.JWT_SECRET)
    return true
  } catch (err) {
    return Promise.reject('Token expired or invalid.')
  }
})
