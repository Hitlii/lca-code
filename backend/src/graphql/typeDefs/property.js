const { gql } = require('apollo-server-express')

module.exports = gql`
   
    
    extend type Mutation {
        "Creates a property, returns the URL generated"
        createProperty(property: CreatePropertyInput!, vendors: [ClientInput!]!):CreatePropertyMutationResponse!
        "Deletes a property by ID, returns string with message if deleted, error if not"
        deleteProperty(id: ID!): DeleteMutationResponse!
        
    }

    type CreatePropertyMutationResponse implements MutationResponse{
        message: String!
        code: Float!
        success: Boolean!
        url: String
    }

    input CreatePropertyInput{
        "Status of the property, can be Venta, Renta, Vendido, Oculto"
        status: String!
        "Type of property i.e Casa, Terreno, Rancho"
        type: String!
        "Zone of the property: Campestre, Urbana, Comercial"
        zone: String!
        "Code of the property"
        code: String!
    
        "Special price, used when the property cost more than 150,000 USD (optional) i.e  880 USD / ha"
        specialPrice: String
        "Is the monthly payment of the property (optional) i.e  'en 72x $ 978 USD'"
        onPayments: String
        
        "Price of the property"
        price: Float!
        "Currency of the property USD/MXN"
        currency: String!
        "Area of the property"
        area: Float!

        "Title of the property"
        title: String!
        
        description: DescriptionInput!
        "Location of the property, address and coordinates"
        location: LocationInput!
        "Media of the property, images and video url"
        media: MediaInput!
        "Meta descriptors, such as description, keywords, author, and URL"
        meta: MetaInput!

    }

    input DescriptionInput{
        "Slate stringified description"
        text: String!
        isDeeded: Boolean
        hasAllServices: Boolean
    }

    

    input MediaInput{
        "Images of the property in the carrousel/slider"
        images: [String!]
        "Video of the property, should be a youtube URL"
        video: String
    }
    input MetaInput{
        "Description of the property MAX 160 characters"
        description: String!
        "URL of the page"
        url: String
        # "Title of the page MAX 55 characters"
        # title: String!
    }

    "Location of the property"
    input LocationInput {
        "State of the property, default B.C"
        state: String!
        "City of the property"
        city: String!
        "Addres of the property"
        address: String!
        "Google Maps API Retrieved coordinates."
        coordinates: CoordinatesInput!
    }
    
    "Google Maps Coordinates of the property"
    input CoordinatesInput{
        lat: Float!
        lng: Float!
    }

    "Represents a Property"
    type Property{
        "ID of the property"
        id: ID!
        "Status of the property, can be Venta, Renta, Vendido, Oculto"
        status: String!
        "Type of property i.e Casa, Terreno, Rancho"
        type: String!
        "Zone of the property: Campestre, Urbana, Comercial"
        zone: String!
        "Code of the property"
        code: String!
        "Special price, used when the property cost more than 150,000 USD (optional) i.e  880 USD / ha"
        specialPrice: String
        "Is the monthly payment of the property (optional) i.e  'en 72x $ 978 USD'"
        onPayments: String
        
        "Price of the property"
        price: Float!
        "Currency of the property USD/MXN"
        currency: String!
        "Area of the property"
        area: Float!

        "Title of the property"
        title: String!
        "Description of the property"
        description: PropertyDescription!

        "Location of the property, address and coordinates"
        location: Location!
        "Media of the property, images and video url"
        media: Media!
        "Meta descriptors, such as description, keywords, author, and URL"
        meta: Meta!
        "Property Vendors"
        vendors: [Client!] 

    }

    "Location of the property, addess and coordinates"
    type PropertyLocation implements Location{
        "State of the property, default B.C"
        state: String!
        "City of the property"
        city: String!
        "Address of the property"
        address: String!
        "Google Maps API Retrieved coordinates."
        coordinates: Coordinates!
    }
    type PropertyDescription {
        text: String!
        isDeeded: Boolean
        hasAllServices: Boolean
    }

    type Meta{
        "Description of the property MAX 160 characters"
        description: String!
        "URL of the page"
        url: String!
        # "Title of the page MAX 55 characters"
        # title: String!
    }

    type Coordinates{       
        lat: Float!
        lng: Float!
    }
    "Media of the property, images and video"
    type Media {
        "Images of the property in the carrousel/slider"
        images: [String!]
        "Video of the property, should be a youtube URL"
        video: String
    }

`
