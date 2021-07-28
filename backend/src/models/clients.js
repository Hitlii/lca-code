const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Client, a client can Own a propoerty o Sell a property
const ClientSchema = new Schema({
  // Name of a client
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  contact: {
    email: {
      type: String,
      unique: true
    },
    phone: {
      type: String,
      unique: true,
      required: true
    }
  },
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }, // State abbreviation i.e B.C -> Baja California
    address: {
      type: String,
      required: true
    }
  }
})


// Defining indexes 
ClientSchema.index({ name: 'text' })
module.exports = mongoose.model('clients', ClientSchema)
