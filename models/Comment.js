const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = require('./standardPostSchema')

commentSchema.add({
  parentPost: {
    type: Number,
    ref: 'Post',
    required: true
  },
  removed: {
    type: Boolean,
    default: false,
  }
})
console.log(commentSchema)

module.exports = CommentModel = mongoose.model('Comment', commentSchema)