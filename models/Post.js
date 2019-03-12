const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-auto-increment')
AutoIncrement.initialize(mongoose)

const postSchema = require('./standardPostSchema').clone()

postSchema.add({
  comments: {
    type: [Object]
  },
  tags: {
    type: [String]
  }
})
postSchema.plugin(AutoIncrement.plugin, {
  model: 'Post',
  startAt: -1, // post nr -1, easter egg ;)
})

module.exports = Post = mongoose.model('Post', postSchema)