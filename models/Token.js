const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jwt_hash: {
    type: String,
    required: true,
  },
  expire_at: {
    type: Date,
    default: Date.now, expires: 14 * 24 * 60 * 60 // 14 days
  }
})


module.exports = Token = mongoose.model('Token', tokenSchema)