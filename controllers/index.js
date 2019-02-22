const {validationResult} = require('express-validator/check')
const Post = require('../models/Post')
const submissionErrorFormatter = require('../helpers/submissionErrorFormatter')

exports.getPost = (req, res) => {
  return res.json({id: req.params.id})
}

exports.postNewPost = async (req, res, next) => {
  const {content, imageURL, comments} = req.body
  const post = new Post({
    content,
    author: req.userName,
    imageURL,
    comments,
  })
  try {
    const result = await post.save()
    return res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

exports.postNewComment = async (req, res, next) => {
  const {content, imageURL, comments} = req.body
  const post = new Post({
    content,
    author: req.userName,
    imageURL,
    comments,
  })
  try {
    const result = await post.save()
    return res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({createdAt: -1}).limit(20)
    return res.json(posts)
  } catch (err) {
    next(err)
  }
}