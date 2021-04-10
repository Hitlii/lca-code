// Requiring enviroment variables from  .env file.
require('dotenv').config();

const { ApolloServer} = require('apollo-server-express');
const express = require('express');
const expressJwt = require('express-jwt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const resolvers = require('./src/graphql/resolvers');
const typeDefs = require('./src/graphql/typeDefs');

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
        credentialsIsRequired: false
    })
)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        const user = req.user || null;
        return {user};
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





