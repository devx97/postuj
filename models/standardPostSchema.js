const mongoose = require('mongoose')
const Schema = mongoose.Schema

const standardPostSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  embedded: {
    type: String,
  },
  usersPlussed: {
    type: [String],
    required: true,
    default: [],
  },
  pluses: {
    type: Number,
    required: true,
    default: 0,
  }
}, {_id: false, timestamps: true})

module.exports = standardPostSchema