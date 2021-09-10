
// Requiring enviroment variables'from  .env file.
require('dotenv').config()

// const { ApolloServer } = require('apollo-server')
const { ApolloServer } = require('apollo-server-lambda')
// const jwt = require('jsonwebtoken')
// const express = require('express')
// const expressJwt = require('express-jwt')
const mongoose = require('mongoose')
// const multer = require('multer')
// const path = require('path')
const resolvers = require('./src/graphql/resolvers')
const typeDefs = require('./src/graphql/typeDefs')
// const { verifyUser } = require('./src/graphql/helper/context')
let conn =  null
// const auth = require('./middleware/auth')


// Mongoose connection configuration options
const mongooseOptions = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false, // Disable mongoose buffering
  serverSelectionTimeoutMS: 5000,
  autoIndex:false
}

// app.use(
//   expressJwt({
//     secret: process.env.SUPER_SECRET,
//     algorithms: ['HS256'],
//     credentialsRequired: false
//   })
// )


  
async function getConnection() {
  if (conn == null) {
    conn = mongoose.connect("mongodb+srv://Hunter3195:TiZnFdltO3WeOHHF@hunter.qu29s.mongodb.net/lca-db?retryWrites=true&w=majority", mongooseOptions).then(() => mongoose);

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn;
  }

  return conn;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({ req }) => {

    // let email = null

    // const bearerHeader = req.headers.authorization === undefined? null:req.headers.authorization
    // if (bearerHeader) {
    //   // Splits Bearer and Token
    //   const token = bearerHeader.split(' ')[1]

    //   //  Gets the payload
    //   const payload = jwt.verify(token, "TENBQmllbmVzUmFpY2Vz")
    //   email  = payload.email
    // }
    return {
      dbConn: await getConnection(),
      // email: email
    }
  },
  formatError: (err) => {
    // Returning errors from third party packages
    if (!err.originalError) {
      return err
    }
    console.log(err)
    // Returning our own errors
    const data = err.originalError.data
    const message = err.message || 'An error ocurred'
    const code = err.originalError.code || 500
    const solution = err.originalError.solution || 'Consulte con el administrador para resolver el problema'

    return {
      message,
      code,
      data,
      solution
    }
  }
})

// server.applyMiddleware({ app })

// Development
// mongoose.set('debug', true)
// mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
//   .then(() => {
//     server.listen({port:8000}).then( ({url}) => console.log(`${url}`))
//   })
//   .catch(err => console.error(err))
  


//Production
  const handler = server.createHandler({
    cors: {
      origin: "https://studio.apollographql.com",
      credentials: true,
      methods:"POST"
    },
  });


exports.graphqlHandler = handler