const userTypeDefs = require('./user')
const clientTypeDefs = require('./client')
const propertyTypeDefs = require('./property')
const ticketTypedefs = require('./ticket')
const { gql } = require('apollo-server')

// Schema stiching
const typeDefs = gql`
    scalar Date
    "Interface of Location, used in Client and Property types"
    interface Location {
        city: String
        state: String
        address: String
    }

    interface MutationResponse{
        message: String!
        code: Float!
        success: Boolean!
    }

    type DeleteMutationResponse implements MutationResponse{
        message: String!
        code: Float!
        success: Boolean!
    }
    type Query{
        _ : String
    }
    
    type Mutation{
        _ : String
    }
`

module.exports = [
  typeDefs,
  userTypeDefs,
  clientTypeDefs,
  propertyTypeDefs,
  ticketTypedefs
]
