const userTypeDefs = require('./user');
const clientTypeDefs = require('./client');

const { gql  } = require('apollo-server-express');

// Schema stiching to improve maintenance
// As the type roots are unique, we 'extend' the type in the other files, we use '_: String' 
// because a typo cannot be extended if it is empty
const typeDefs = gql`

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
    clientTypeDefs
]