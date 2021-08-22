const UserSchema = require('../../models/user.js')
const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated } = require('./middleware')

module.exports = {
  Query: {
    // We combine the 'isAuthenticated' resolver middleware
    // to check if user is authenticated, if it is then the next resolver is executed
    user: combineResolvers(isAuthenticated, async (_, { id }, context) => {
      const User = context.dbConn.model('users', UserSchema)
      const user = await User.findOne(context.email)

      return user || null
    })
  },
  Mutation: {
    login: async (_, { input },context) => {
      try {
        // Find User
        const User = context.dbConn.model('users', UserSchema)

        const user = await User.findOne({ email: input.email })
        // User not found
        if (!user) throw new UserInputError('Correo no registrado')

        // Validating Password
        const passwordPassed = await bcrypt.compare(input.password, user.password)
        if (!passwordPassed) throw new UserInputError('Contraseña invalida')

        // If max age is true, token will last 60 days, if not it will last 3 hr
        const expiresIn = input.rememberMe ? '60d' : '3hr'

        // JWT Generation
        const token = jwt.sign(
          { email: input.email },
          process.env.SUPER_SECRET,
          { algorithm: 'HS256', subject: user._id.toString(), expiresIn }
        )

        return { token }
      } catch (error) {
        console.log(error)

        throw error
      }
    }
  }
}
