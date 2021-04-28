const { gql } = require('apollo-server-express');

module.exports = gql`
    type Client {
        id: ID!
        name: String!
        gender: String
        birthday: String
        contact: Contact
        location: Location
    }
    
    type Contact{
        email: String
        phone: String
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
        getClient(name: String!): Client
    }

    extend type Mutation {
        "Mutation to create a new client, returns the created client"
        createClient(name: String!, gender: String, birthday: String, email: String, phone: String, city: String, state: String, address: String): Client
        "Mutation to update the details of a client, returns the updated client"
        updateClient(id: ID!, name: String, gender: String, birthday: String, email: String, phone: String, city: String, state: String, address: String): Client
        "Mutation to delete an existing client by ID, returns a boolean to indicate whether the operation was succesful or not"
        deleteClient(id: ID!): Boolean
    }
`;