const { gql } = require('apollo-server-express');



module.exports = gql`
  
  extend type Query {
    "Returns an user by a given email, needs authentication"
    user(email:String!): User
  }

  extend type Mutation{
    "Login mutation, returns a JWT signed token"
    login(input: loginInput!): Token
  
  }

  "A user is the single person who has acces to the system"
    type User{
      "User unique ID"
      id: ID!
      "User unique email"
      email: String!
  }
  "Represents the JWT token used for auth"
  type Token{
    token: String!
  }

  "Represents the inputs that will be sent from the frontend"
  input loginInput{
    "Email of the user"
    email: String!   
    "Password of the user" 
    password: String!
    "Remember me, if true token will last 2 months otherwise 3hr"
    rememberMe: Boolean!
  }


`;
