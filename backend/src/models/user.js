const mongoose = require('mongoose')

const Schema = mongoose.Schema

// User schema that will be in the database
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  // User password encrypted with bcrypt
  password: {
    type: String,
    required: true
  },
  // Token for password reset
  token: {
    type: String
  },
  // Expiration of token
  expirationToken: {
    type: Date
  }
})

// module.exports = mongoose.model('users', UserSchema)
module.exports = UserSchema