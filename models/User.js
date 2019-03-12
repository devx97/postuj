const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-auto-increment')

AutoIncrement.initialize(mongoose)

const userSchema = new Schema({
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
    type: [Number],
    ref: 'Post'
  },
  blacklistedPeople: {
    type: [Number],
    ref: 'User'
  },
  blacklistedTags: {
    type: [String],
    ref: 'Tag'
  }
}, {_id: false, timestamps: true})

userSchema.plugin(AutoIncrement.plugin, 'User')

module.exports = User = mongoose.model('User', userSchema)