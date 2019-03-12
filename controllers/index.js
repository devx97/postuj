const Post = require('../models/Post')
const User = require('../models/User')
const CommentModel = require('../models/Comment')
const filter = require('../helpers/filter')

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({_id: req.params.postId})
    const formattedPost = filter.posts([post])
    return res.json(formattedPost[0])
  } catch (err) {
    next(err)
  }
}

exports.postNewPost = async (req, res, next) => {
  const {content, embedded} = req.body
  const post = new Post({
    content,
    author: req.username,
    embedded,
  })
  try {
    const user = await User.findOne({_id: req.userId})
    const result = await post.save()
    if (user.posts.indexOf(result._id) < 0) {
      user.posts.push(result._id)
      await user.save()
    }
    const filteredPost = filter.posts([result])
    return res.status(201).json(filteredPost[0])
  } catch (err) {
    next(err)
  }
}

exports.postNewComment = async (req, res, next) => {
  const {content, embedded, postId} = req.body
  const post = await Post.findOne({_id: postId})
  const comment = new CommentModel({
    _id: post.comments.length + 1,
    author: req.username,
    content,
    embedded,
    createdAt: Date.now(),
  })
  post.comments.push(comment)
  const filtered = filter.comments([comment])
  try {
    const user = await User.findOne({_id: req.userId})
    const result = await post.save()
    if (user.posts.indexOf(result._id) < 0) {
      user.posts.push(result._id)
      await user.save()
    }
    return res.status(201).json(filtered[0])
  } catch (err) {
    next(err)
  }
}

exports.postEditPost = async (req, res, next) => {
  const {content, postId, commentId} = req.body
  const post = await Post.findOne({_id: postId})
  if (commentId) {
    post.comments[commentId - 1].content = content
    post.markModified('comments') // nested values have to be marked to save()
  } else {
    post.content = content
  }
  await post.save()
  res.json({success: true})
}

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({createdAt: -1}).limit(20)
    const formattedPosts = filter.posts(posts)
    return res.json(formattedPosts)
  } catch (err) {
    next(err)
  }
}

exports.postPlus = async (req, res, next) => {
  const postId = req.body.postId
  let commentId = req.body.commentId
  let pluses;
  try {
    const post = await Post.findById(postId)
    if (req.body.commentId) { // if this is comment
      commentId = commentId - 1
      const index = post.comments[commentId].usersPlussed.indexOf(req.username)
      if (index > -1) {
        post.comments[commentId].usersPlussed = post.comments[commentId].usersPlussed.filter(
            username => username !== req.username)
      } else {
        post.comments[commentId].usersPlussed.push(req.username)
      }
      post.comments[commentId].pluses = post.comments[commentId].usersPlussed.length
      pluses = post.comments[commentId].pluses
      post.markModified('comments') // nested values have to be marked to save()
    } else {  // if its not comment
      const index = post.usersPlussed.indexOf(req.username)
      if (index > -1) {
        post.usersPlussed = post.usersPlussed.filter(username => username !== req.username)
      } else {
        post.usersPlussed.push(req.username)
      }
      post.pluses = post.usersPlussed.length
      pluses = post.pluses
    }
    await post.save()
    res.json({pluses})
  } catch (err) {
    console.log(err)
  }
}