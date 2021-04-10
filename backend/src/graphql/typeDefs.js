const { gql } = require('apollo-server');


module.exports = gql`
  
  "User type"
  type User{
      "User unique ID"
      id: ID!
      "User unique email"
      email: String!
      "User log status"
      loggedIn: Boolean!
  }

  type Query {
    "Returns an user by a given ID"
    user(id:ID!): User
    "Returns authenticated User information base on the data in the JWT Token "
    viewer: User!
  }

  type Mutation{
    "Login mutation, returns JWT signed token"
    login(email: String! , password: String!): String
  
  }
`;
