const jwt = require('jsonwebtoken')
module.exports.verifyUser = async (req) => {
  try {
    req.email = null
    const bearerHeader = req.headers.authorization
    if (bearerHeader) {
      // Splits Bearer and Token
      const token = bearerHeader.split(' ')[1]

      //  Gets the payload
      const payload = jwt.verify(token, process.env.SUPER_SECRET)
      req.email = payload.email
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
