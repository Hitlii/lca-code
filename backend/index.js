// Requiring enviroment variables from  .env file.
require('dotenv').config()

const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const expressJwt = require('express-jwt')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')

const resolvers = require('./src/graphql/resolvers')
const typeDefs = require('./src/graphql/typeDefs')
const { verifyUser } = require('./src/graphql/helper/context')

const app = express()

// Destination. Where the files will be stored
// FileName. The name of the files, in this case we add a unique id to avoid name collisions
const storage = multer.diskStorage(({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
}))

const limits = {
  fileSize: 2000000, // Max File Size 2 MB
  fields: 0, // Number of non-file fields.
  files: 25 // For multipart forms, the max number of file fields
}

const fileFilter = (req, file, cb) => {
  (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') ? cb(null, true) : cb(null, false)
}

app.use(
  multer({ storage, fileFilter, limits }).array('images', 25)
)

app.use('/images', express.static(path.join(__dirname, 'images')))

app.put('/post-images', (req, res, next) => {
  if (!req.files) {
    return res.status(200).json({ message: 'No file provided!' })
  }
  const filesPath = req.files.map(file => file.path)
  return res.status(201).json({ message: 'File Stored', filesPath })
})

// Mongoose connection configuration options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

app.use(
  expressJwt({
    secret: process.env.SUPER_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false
  })
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    console.log(err)
    // Returning errors from third party packages
    if (!err.originalError) {
      return err
    }
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
  },
  context: async ({ req }) => {
    await verifyUser(req)

    return { email: req.email }
  }
})

server.applyMiddleware({ app })

mongoose.set('debug', true)
mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Apollo Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
      console.log('💾 Connected to lca-db data base')
    })
  })
  .catch(err => console.error(err))
