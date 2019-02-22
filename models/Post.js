const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-auto-increment')
// mongoose.createConnection(process.env.DB_URI)
AutoIncrement.initialize(mongoose)

const postSchema = require('./standardPostSchema')

postSchema.add({
  totalPluses: {
    type: Number,
    required: true
  },
  comments: {
    type: [Schema.Types.ObjectId]
  },
  commentsCount: {
    type: Number,
    required: true
  },
  tags: {
    type: [String]
  }
})
postSchema.plugin(AutoIncrement.plugin, 'Post')

module.exports = Post = mongoose.model('Post', postSchema)