const {validationResult} = require('express-validator/check')
const Post = require('../models/Post')

exports.getPost = (req, res, next) => {
  return res.json({id: req.params.id})
}

exports.postNewPost = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    })
  }
  const {content, imageURL, comments} = req.body
  const post = new Post({
    content,
    author: req.userName,
    imageURL,
    comments,
  })
  try {
    const result = await post.save()
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({errors: ['Internal server error.']});
  }
}

exports.getPosts = async (req, res, next) => {
  const posts = await Post.find().sort({createdAt: -1}).limit(20)
  return res.json(posts)
}