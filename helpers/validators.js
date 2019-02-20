const {body} = require('express-validator/check')

exports.usernameValidator = bodyField => body(bodyField).trim().not().isEmpty()
.isLength({min: 4, max: 32})
.withMessage("Username must contain 4 to 32 characters.")
.custom(username =>
    /^[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*[a-zA-Z0-9]$/.test(username))
.withMessage("Invalid username.")

exports.emailValidator = bodyField => body(bodyField).trim().isEmail()
.withMessage('Please enter a valid email.')
.normalizeEmail()
.isLength({min: 6, max: 64})
.withMessage("Email must contain 6 to 64 characters.")

exports.passwordValidator = bodyField => body(bodyField).trim()
.isLength({min: 6, max: 64})
.withMessage('Password must contain 6 to 64 characters.')
