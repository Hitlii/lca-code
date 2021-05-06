const mongoose = require('mongoose')

const TicketsSchema = mongoose.Schema({

  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'properties'
  },
  clients: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'clients'
    },
    name: {
      type: String,
      required: true
    }
  }],
  status: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  promissory: [{
    months: {
      type: Number,
      required: true
    },
    payment: {
      type: Number,
      required: true
    }
  }],
  emissionDate: {
    type: Date,
    required: true
  },
  paymentLocation: String,
  paymentAddress: String
}

)

module.exports = mongoose.model('tickets', TicketsSchema)
