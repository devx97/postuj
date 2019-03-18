const express = require('express')

const isAuth = require('../middlewares/is-auth')
const handleVerificationErrors = require('../middlewares/handleVerificationErrors')

const router = express.Router()

const authController = require('../controllers/auth')
const {
  usernameValidator,
  usernameTakenValidator,
  emailValidator,
  passwordValidator,
  passwordsMatchValidator,
  emailExistsValidator,
  emailTakenValidator,
  tokenValidator
} = require('../helpers/authValidators')

router.post('/register',
    [
      usernameValidator('username'),
      usernameTakenValidator('username'),
      emailValidator('email'),
      emailTakenValidator('email'),
      passwordValidator('password'),
      passwordValidator('password2'),
      passwordsMatchValidator('password2', 'password')
    ],
    handleVerificationErrors,
    authController.register
)

router.post(
    '/login',
    [
      emailValidator('email'),
      emailExistsValidator('email'),
      passwordValidator('password')
    ],
    handleVerificationErrors,
    authController.login
)

router.post('/forgot-password',
    [
      emailValidator('email'),
      emailExistsValidator('email'),
    ],
    handleVerificationErrors,
    authController.forgotPassword
)

router.post('/reset-password',
    [
      passwordValidator('newPassword'),
      passwordValidator('newPassword2'),
      passwordsMatchValidator('newPassword2', 'newPassword'),
      tokenValidator('resetToken'),
    ],
    handleVerificationErrors,
    authController.resetPassword
)

router.get('/logout', authController.logOut)

router.get('/token', isAuth, authController.token)

module.exports = router