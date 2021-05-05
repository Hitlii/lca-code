const Client = require('../../models/clients')
const { clientInputValidator } = require('../helper/validators')

/**
  @description Validates and filters an array of clients
  @param {Array} clients An array of clients with existing and new clients included
  @returns {existingClients, newClients, validationErrors} Filtered clients and validation errors.
 */
async function clientFilter (clients) {
  let sameContactInfo = null
  const newClients = []
  const existingClients = []
  let validationErrors = null

  // Seperating existing clients from new clients
  for (const client of clients) {
    client._id = client.id
    // A client with an id will be an existing client
    if (client.id) {
      existingClients.push(client)
    } else {
      // Validating client input
      validationErrors = clientInputValidator(client)

      // Checking uniqueness of email and phone
      sameContactInfo = await Client.find({
        $or: [
          { 'contact.email': client.contact.email },
          { 'contact.phone': client.contact.phone }
        ]
      },
      'contact')

      if (sameContactInfo) {
        sameContactInfo.forEach(({ contact }) => {
          if (client.contact.phone === contact.phone) validationErrors = { ...validationErrors, 'contact.phone': `Phone ${contact.phone} already exists` }
          if (client.contact.email === contact.email) validationErrors = { ...validationErrors, 'contact.email': `Email ${contact.email} already exists` }
        })
      }

      newClients.push(client)
    }
  }
  return {
    existingClients,
    newClients,
    validationErrors
  }
}

module.exports = {
  clientFilter
}
