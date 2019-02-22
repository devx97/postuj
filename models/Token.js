const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = new Schema({
  userId: {
    type: Number,
    ref: 'User',
    required: true,
  },
  jwt_hash: {
    type: String,
    required: true,
  },
  expire_at: {
    type: Date,
    expires: 24 * 60 * 60, // 1 day, will change this to 7days in prod
  }
})


module.exports = Token = mongoose.model('Token', tokenSchema)