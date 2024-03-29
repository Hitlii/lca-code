const { skip } = require('graphql-resolvers')

// Middleware, checks if user is authenticated
module.exports.isAuthenticated = (parent, args, {email}) => {
  if (!email) {
    const error = new Error('Acceso denegado!')
    error.code = 401
    error.solution = 'Inicie sesion para continuar c:'
    throw error
  }
  return skip
}
