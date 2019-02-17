const express = require('express')
const {body} = require('express-validator/check')
const router = express.Router()

const mainController = require('../controllers/index')
const isAuth = require('../middleware/is-auth')

router.post('/post/new',
    [
        body('content')
        .isLength({min: 10})
        .trim()
    ],
    mainController.postNewPost)

router.get('/post/:id', mainController.getPost)

router.get('/posts', isAuth, mainController.getPosts)

module.exports = router