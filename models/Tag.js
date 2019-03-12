const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  posts: {
    type: [Number],
    ref: 'Post',
    default: []
  },
  backgroundUrl: {
    type: String
  },
  subscribers: {
    type: [Number],
    ref: 'User',
    default: [],
  }
}, {_id: false, timestamps: true})


module.exports = User = mongoose.model('User', tagSchema)