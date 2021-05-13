const { gql } = require('apollo-server-express')

module.exports = gql`
    type Client {
        id: ID!
        name: String!
        gender: String
        birthday: String
        contact: Contact
        location: ClientLocation
    }

    type Contact{
        email: String
        phone: String!
    }
    
    type ClientLocation implements Location{
        city: String
        state: String
        address: String 
    }

    extend type Query {
        "Returns all registered clients"
        getClients: [Client]
        "Returns a client given its name"
        getClient(id: ID!): Client
    }

     input ClientInput {
        id: ID
        name: String!
        gender: String
        birthday: Date
        contact: ContactInput
        location: ClientLocationInput
    }

    input ContactInput{
        email: String
        phone: String!
    }

    input ClientLocationInput{
        city: String!
        state: String!
        address: String! 
    }

    extend type Mutation {
        "Mutation to create a new client, returns the created client"
        createClient(client: ClientInput!): ClientMutationResponse
        "Mutation to update the details of a client, returns the updated client"
        updateClient(id: ID!, name: String, gender: String, birthday: String, email: String, phone: String, city: String, state: String ,address: String): ClientMutationResponse
        "Mutation to delete an existing client by ID, returns a boolean to indicate whether the operation was succesful or not"
        deleteClient(id: ID!): DeleteMutationResponse
    }

    type ClientMutationResponse implements MutationResponse{
        code: Float!
        success: Boolean!
        message: String!
        client: Client
    }
`
