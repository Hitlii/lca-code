const mongoose = require('mongoose');


const PropertiesSchema = mongoose.Schema({
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
        required: true,
    },   
    description: {
        isDeeded: Boolean,
        hasAllServices: Boolean,
        text: String
    },
    location: {
        state: String,
        city: String,
        address: String, 
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
            required: true,
        }
        thumbnail: { // Cards
            type: String,
            required: true
        },
        // Youtube video, optional
        video: String, 
    }

    meta:{
        description: String,
        keywords: String,
        url: String,
        title: String
    }

    vendors:[
           { 
                _id: {
                    type: Schema.Types.ObjectId, 
                    ref: 'clients', 
                }
                name: String,
                phone: String
           }
        ],
    
    // tickets:[
    //     {

            
    //     }
    // ]
});


// Google Maps API 
// PWA Manifiesto.

// Media Agregar imagenes, ordenarlas y eliminar  (No drag n' drop, ordenacion por posicion) 
// Slate   Agregar en base de datos JSON.Stringify. Para diplay usar Switch Case y renderizar componente de Material UI
// Formik?
module.exports = mongoose.model('properties', PropertiesSchema)