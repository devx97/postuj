const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'Post'
  }
}, {_id: false, timestamps: true})

postSchema.plugin(AutoIncrement)

module.exports = Post = mongoose.model('Post', postSchema)