const express = require('express')
const router = express.Router()

const mainController = require('../controllers/index')
const isAuth = require('../middlewares/is-auth')
const handleVerificationErrors = require('../middlewares/handleVerificationErrors')
const {
  postLengthValidator,
  antiSpamValidator,
  postExists,
  isAuthorValidator,
} = require('../helpers/postValidators')

router.post('/post/new',
    isAuth,
    [
      postLengthValidator('content'),
      antiSpamValidator(),
    ],
    handleVerificationErrors,
    mainController.postNewPost)

router.post('/post/new-comment',
    isAuth,
    [
      postLengthValidator('content')
    ],
    handleVerificationErrors,
    mainController.postNewComment)

router.post('/post/edit',
    isAuth,
    [
      postLengthValidator('content'),
      postExists('postId'),
      isAuthorValidator(),
    ],
    handleVerificationErrors,
    mainController.postEditPost)

router.get('/post/:postId', mainController.getPost)

router.get('/posts', mainController.getPosts)

router.post('/post/plus/', isAuth, mainController.postPlus)

module.exports = router