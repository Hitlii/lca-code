const { gql } = require('apollo-server')

module.exports = gql`
    extend type Mutation {
        "Creates a property, returns the URL generated"
        createProperty(property: CreatePropertyInput!, vendors: [ClientInput!]!):CreatePropertyMutationResponse!
        "Deletes a property by ID, returns string with message if deleted, error if not"
        deleteProperty(_id: ID!): DeleteMutationResponse!
        
    }

    extend type Query {
        "Returns a property by url"
        getProperty(url: String!):PropertyAndRelated
        "Returns properties based on a optional filter"
        getProperties(filter: PropertyFilterInput, order: PropertyOrderInput, pagination: PropertyPaginationInput!): [Property]
        "Returns admin properties based on a filter"
        getAdminProperties(filter: PropertyFilterInput, pagination: PropertyPaginationInput!):[Property]
        "Returns admin property by url"
        getAdminProperty(url: String!): Property
        "Returns the featured properties"
        getFeaturedProperties:[Property!]
        "Returns all properties without pagination"
        getAllProperties(isAdminCard: Boolean):[Property]

    }
    
    type CreatePropertyMutationResponse implements MutationResponse{
        message: String!
        code: Float!
        success: Boolean!
        "The url of the created property"
        url: String
    }

    "Property filter input."
    input PropertyFilterInput{
        zone: String,
        type: String,
        status: String
        city: String,
        # By now state will not be used because state is always 'B.C'
        #state: String
        price: PriceInput
        area: AreaInput
        "Search text"
        search: String 
    }

    "Input for ordering properties"
    input PropertyOrderInput{
        "1 ascending and -1 descending order"
        price: Float,
        area: Float
    }
    input PropertyPaginationInput{
        pageNumber: Float!
    }


    
    "Price input for Filter Input"
    input PriceInput{
        minPrice: Float,
        maxPrice: Float
    }
    "Area input for AreaInput"
    input AreaInput{
        minArea: Float,
        maxArea: Float
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
        "If a property is a featured property"
        isFeatured: Boolean
    
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

    "Media input, images and video"
    input MediaInput{
        "Images of the property in the carrousel/slider"
        images: [String!]
        "Video of the property, should be a youtube URL"
        video: String
    }

    "Metadescriptor Input"
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
        _id: ID!
        "Checks if the property is a featured property"
        isFeatured: Boolean
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
        location: PropertyLocation!
        "Media of the property, images and video url"
        media: Media!
        "Meta descriptors, such as description, keywords, author, and URL"
        meta: Meta!
        "Property Vendors"
        vendors: [Client!] 
        tickets: [Ticket!]

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
    "Description of the property"
    type PropertyDescription {
        "Description of the property (Slate)"
        text: String!
        isDeeded: Boolean
        hasAllServices: Boolean
    }

    "Metadescriptors of the property, useful for SEO"
    type Meta{
        "Description of the property MAX 160 characters"
        description: String!
        "URL of the page"
        url: String!
        # "Title of the page MAX 55 characters"
        # title: String!
    }

    "Coordinates of the property"
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

    "Property and related properties when we query getProperty"
    type PropertyAndRelated {
        property: Property,
        relatedProperties: [Property!]
    }

    

`
