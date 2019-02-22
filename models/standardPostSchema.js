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
  embed: {
    type: String,
  },
  peoplePlussed: [String],
  pluses: {
    type: Number,
    required: true
  },
}, {_id: false, timestamps: true})

module.exports = standardPostSchema