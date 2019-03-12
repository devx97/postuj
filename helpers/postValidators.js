const Post = require('../models/Post')
const {body} = require('express-validator/check')

exports.postLengthValidator = (fieldName) =>
    body(fieldName)
    .trim()
    .isLength({min: 10})
    .withMessage("Post must contain at least 10 characters.")

exports.antiSpamValidator = () =>
    body()
    .custom((body, {req}) => {
      return true
    })

exports.idValidator = fieldName =>
    body(fieldName)

exports.postExists = fieldName =>
    body(fieldName)
    .custom((postId, {req}) =>
        Post.findOne({_id: postId})
        .then(post => {
          if (req.body.commentId) {
            return post.comments.length <= req.body.commentId
          } else {
            return post
          }
        }))
    .withMessage("Post with specific ID does not exist.")

exports.isAuthorValidator = () =>
    body()
    .custom((body, {req}) =>
        Post.findOne({_id: body.postId})
        .then(post => {
          if (body.commentId) {
            return post.comments[commentId - 1].author === req.username
          } else {
            return post.author === req.username
          }
        }))
    .withMessage("You're not an author of this post/comment.")

exports.postTooOldToEdit = () =>
    body()