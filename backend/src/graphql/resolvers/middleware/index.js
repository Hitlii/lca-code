const { skip } = require('graphql-resolvers')

// Middleware, checks if user is authenticated
module.exports.isAuthenticated = (parent, args, { email }) => {
  if (!email) {
    throw new Error('Access Denied! Please login to continue')
  }
  return skip
}
