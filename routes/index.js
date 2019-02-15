const express = require('express')
const {body} = require('express-validator/check')
const router = express.Router()

const mainController = require('../controllers/index')

router.post('/post/new',
    [
        body('content')
        .trim()
        .isLength({min: 10})
    ],
    mainController.postNewPost)

router.get('/post/:id', mainController.getPost)

router.get('/posts', mainController.getPosts)

module.exports = router