const mongoose = require('mongoose')

const PropertiesSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  // i.e Venta, Renta, Vendido, Oculto
  status: {
    type: String,
    required: true
  },
  // i.e Terreno, Casa Rancho ... (DropDown)
  type: {
    type: String,
    required: true
  },
  // i.e Campestre, Residencial, Comercial  (Group Button)
  zone: {
    type: String,
    required: true
  },

  // Price of the property
  price: {
    type: Number,
    required: true
  },
  // Currency, USD or MXN (API Casa de cambio)
  currency: {
    type: String,
    required: true
  },

  // 400 USD /ha
  specialPrice: String,
  // If a property is in payments, this field displays the monthly payment
  onPayments: String,

  // If area >= 10,000 m then area will be represeted as hectare
  area: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    isDeeded: Boolean,
    hasAllServices: Boolean,
    text: {
      type: String,
      required: true
    }
  },
  location: {
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    coordinates: { // Google maps API
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    }
  },
  media: {
    images: {
      type: [String],
      required: true
    },
    // Youtube video, optional
    video: String
  },

  meta: {
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true,
      unique: true
    }
    // title: {
    //   type: String,
    //   required: true
    // }
  },

  vendors: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients'
      },
      name: String,
      contact: {
        email: String,
        phone: String
      }
    }
  ],

  tickets: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tickets'
      },
      clients: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'clients'
        },
        name: String
      }],
      area: Number,
      price: Number,
      currency: String,
      emissionDate: Date

    }
  ]
})

// Defining indexes
PropertiesSchema.index({ title: 'text', code: 'text' })
module.exports = mongoose.model('properties', PropertiesSchema)
