const {body} = require('express-validator/check')

exports.usernameValidator = bodyFieldName => body(bodyFieldName).trim().not().isEmpty()
.isLength({min: 4, max: 32})
.withMessage("Username must contain 4 to 32 characters.")
.custom(username =>
    /^[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*[a-zA-Z0-9]$/.test(username))
.withMessage("Invalid username.")

exports.emailValidator = bodyFieldName => body(bodyFieldName).trim().isEmail()
.withMessage('Please enter a valid email.')
.normalizeEmail()
.isLength({min: 6, max: 64})
.withMessage("Email must contain 6 to 64 characters.")

exports.passwordValidator = bodyFieldName => body(bodyFieldName).trim()
.isLength({min: 6, max: 64})
.withMessage('Password must contain 6 to 64 characters.')
