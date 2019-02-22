const express = require('express')
const {body} = require('express-validator/check')
const router = express.Router()

const mainController = require('../controllers/index')
const isAuth = require('../middlewares/is-auth')
const handleVerificationErrors = require('../middlewares/handleVerificationErrors')

// noinspection JSCheckFunctionSignatures
router.post('/post/new',
    isAuth,
    [
      body('content')
      .trim()
      .isLength({min: 10})
      .withMessage("Post must contain at least 10 characters.")
    ],
    handleVerificationErrors,
    mainController.postNewPost)

router.post('/post/new-comment',
    isAuth,
    [
      body('content')
      .trim()
      .isLength({min: 10})
      .withMessage("Post must contain at least 10 characters.")
    ],
    handleVerificationErrors,
    mainController.postNewComment)

router.get('/post/:id', mainController.getPost)

router.get('/posts', mainController.getPosts)

module.exports = router