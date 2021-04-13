// Requiring enviroment variables from  .env file.
require('dotenv').config();

const { ApolloServer} = require('apollo-server-express');
const express = require('express');
const expressJwt = require('express-jwt');
const mongoose = require('mongoose');

const resolvers = require('./src/graphql/resolvers');
const typeDefs = require('./src/graphql/typeDefs');
const {verifyUser} = require('./src/graphql/helper/context');
const app = express();

// Mongoose connection configuration options
let mongooseOptions = {
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    useCreateIndex: true
}

app.use(
    expressJwt({
        secret: process.env.SUPER_SECRET,
        algorithms: ["HS256"],
        credentialsRequired: false
    })
);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        await verifyUser(req);
        
        return { email: req.email};
    }
})

server.applyMiddleware({app});


mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
.then( ()=> {
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Apollo Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
        console.log('💾 Connected to lca-db data base');
    })
})
.catch(err => console.error(err));





