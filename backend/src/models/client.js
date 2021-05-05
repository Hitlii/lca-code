const mongoose = require('mongoose')

const Schema = mongoose.Schema

// A Client can own or sell a property
const ClientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: String,
  birthday: Date,
  contact: {
    email: String,
    phone: String
  },
  location: {
    city: String,
    state: String,
    address: String
  }
})

module.exports = mongoose.model('clients', ClientSchema)
