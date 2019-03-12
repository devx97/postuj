const mongoose = require('mongoose')
const commentSchema = require('./standardPostSchema').clone()

commentSchema.add({
  _id: {
    type: Number,
    required: true,
    default: 1
  },
  removed: {
    type: Boolean,
    default: false,
  }
})

module.exports = CommentModel = mongoose.model('Comment', commentSchema)