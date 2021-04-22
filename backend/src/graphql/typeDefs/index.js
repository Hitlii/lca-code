const userTypeDefs = require('./user');
const clientTypeDefs = require('./client');
const propertyTypeDefs = require('./property');

const { gql  } = require('apollo-server-express');

// Schema stiching to improve maintenance
// As the type roots are unique, we 'extend' the type in the other files, we use '_: String' 
// because a typo cannot be extended if it is empty
const typeDefs = gql`

    "Interface of Location, used in Client and Property types"
    interface Location {
        city: String
        state: String
        address: String
    }
    type Query{
        _ : String
    }
    
    type Mutation{
        _ : String
    }
`;

module.exports = [
    typeDefs,
    userTypeDefs,
    clientTypeDefs,
    propertyTypeDefs,
]