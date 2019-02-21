const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: {
    type: [Schema.Types.ObjectId],
    ref: 'Post'
  },
  resetToken: {
    type: String,
  },
}, {timestamps: true})


module.exports = User = mongoose.model('User', postSchema)