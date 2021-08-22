const { gql } = require('apollo-server')

module.exports = gql`

    extend type Mutation{
        "Creates a ticket, returns created ticket."
        createTicket(ticket: CreateTicketInput!, clients: [ClientInput!]!):CreateEditTicketMutationResponse!
        "Updates a ticket, returns updated ticket."
        updateTicket(ticket: UpdateTicketInput!, clients: [ClientInput!]): CreateEditTicketMutationResponse!
        "Deletes a ticket (id) from a property (propertyID)"
        deleteTicket(_id:ID!, propertyId: ID!): DeleteMutationResponse!


    }

    extend type Query {
        "Gets tickets by propertyId"
        getTickets(propertyId:ID): [Ticket]
        "Gets a ticket by id"
        getTicket(_id:ID): Ticket
    }

    type CreateEditTicketMutationResponse implements MutationResponse{
        message: String!
        code: Float!
        success: Boolean!
        ticket: Ticket
    }

    input CreateTicketInput{ 
        propertyId: ID!
        status: String!
        area: Float!
        price: Float!
        currency: String!
        promissory: [PromissoryInput]
        emissionDate: Date!   
        paymentLocation: String!
        paymentAddress: String!
    }
    input UpdateTicketInput{
        _id: ID!
        propertyId: ID!
        status: String
        area: Float
        price: Float
        currency: String
        promissory: [PromissoryInput]
        emissionDate: Date   
        paymentLocation: String
        paymentAddress: String
    }

    input PromissoryInput{
        months: Float!
        payment: Float!
    }
   
    type Ticket{
        "Ticket ID"
        _id: ID!
        "Id of the property"
        propertyId: ID!
        "Arrangement of clients buying or renting a property"
        clients:[Client!]!
        "Status of the ticket, can be En proceso/Terminado"
        status: String!
        "Area of the rented or selled property. "
        area: Float!
        "Price of the property"
        price: Float!
        "Currency of the property"
        currency: String!
        "Emission date of the sale or rent of the property"
        emissionDate: Date!   
        "Promissory of the ticket when it is sold on payments"
        promissory: [Promissory!]
        "Location where the payment will be made"
        paymentLocation: String
        "Address where the payment will be made"
        paymentAddress: String
    }

    "Is a sale made on payments"
    type Promissory{
        months: Float!
        payment: Float!
    }
`
