const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Client, a client can Own a propoerty o Sell a property
const ClientSchema = new Schema({
    // Name of a client
    name:{
        type: String,
        required: true,
    }
    genre: String, 
    birthday: Date;
    contact:{
        email: String,
        phone: String,
    }
    location{
        city: String,
        state: String, // State abbreviation i.e B.C -> Baja California
        addres: String,
    }
})

module.exports = mongoose.model('clients', ClientSchema);