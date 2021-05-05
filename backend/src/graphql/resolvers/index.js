const userResolver = require('./user')
const clientResolver = require('./client')
const propertyResolver = require('./property')
const ticketResolver = require('./ticket')
const { GraphQLScalarType, Kind } = require('graphql')

const interfaceResolver = {
  Location: {
    __resolveType (location, context, info) {
      if (location.coordinates) return 'PropertyLocation'
      return 'ClientLocation'
    }
  },
  MutationResponse: {
    __resolveType (mutation, context, info) {
      if (mutation.url) return 'CreatePropertyMutationResponse'
      if (mutation.ticket) return 'CreateTicketMutationResponse'
      return 'DeleteMutationResponse'
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize (value) {
      return new Date(value) // Convert outgoing Date to integer for JSON
    },
    parseValue (value) {
      return new Date(value) // Convert incoming integer to Date
    },
    parseLiteral (ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value) // Convert hard-coded AST string to integer and then to Date
      }
      return null // Invalid hard-coded value (not an integer)
    }
  })
  // Taken from https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/#example-the-date-scalar
}
// Modularizing the scheme to improve maintenance
module.exports = [
  interfaceResolver,
  userResolver,
  clientResolver,
  propertyResolver,
  ticketResolver

]
