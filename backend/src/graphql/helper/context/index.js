const jwt = require('jsonwebtoken')
module.exports.verifyUser = async (req) => {
  try {
    let email = null
    const bearerHeader = req.headers.authorization
    if (bearerHeader) {
      // Splits Bearer and Token
      const token = bearerHeader.split(' ')[1]

      //  Gets the payload
      const payload = jwt.verify(token, "TENBQmllbmVzUmFpY2Vz")
      email  = payload.email
      return email
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
