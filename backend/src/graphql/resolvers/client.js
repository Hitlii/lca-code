const Client = require('../../models/clients')
const ObjectId = require('mongoose').Types.ObjectId
const { clientInputValidator, isObjectIdValid } = require('../helper/validators')

module.exports = {
  Query: {
    getClient: async (_, { id }) => {
      try {
        const client = await Client.findById(ObjectID(id))
        return client || null
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    getClients: async () => {
      try {
        const clients = await Client.find({})
        return clients || null
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  },
  Mutation: {
    createClient: async (_, { client }) => {
      // Input validation
      //const clientValidationError = new clientInputValidator(client)
      
      // Invalid user input
      /*if (clientValidationError) {
        let error = new Error('Error validando inputs de cliente')
        error.code = 400
        error.data = clientValidationError
        error.solution = 'Revise los campos enviados'
        throw error
      }*/
      
      const newClient = new Client({ ...client })

      // DB Client Creation
      await newClient.save()

      return {
        code: 201,
        success: true,
        message: 'Cliente creado existosamente.',
        client: newClient
      }
    },
    updateClient: async (_, { id, name, gender, birthday, email, phone, city, state, address }) => {
      let error = null
      if(!isObjectIdValid(id)) {
        error = new Error('Este ID no es válido')
        error.code = 400
        error.solution = 'Ingrese un ID valido'
        throw error
      }
      
      // Create object with fields to update
      const tempClient = {
        name,
        gender,
        birthday,
        'contact.email': email,
        'contact.phone': phone,
        'location.city': city,
        'location.state': state,
        'location.address': address
      }

      // Clean object to remove null/undefined fields
      Object.keys(tempClient).forEach((k) => tempClient[k] == null && tempClient[k] == undefined && delete tempClient[k])

      // Wait for update operation
      const updatedClient = await Client.findByIdAndUpdate(
        ObjectId(id),
        { $set: tempClient },
        { new: true }
      )
      // Return updated fields
      return {
        code: 200,
        success: true,
        message: 'Datos modificados con exito.',
        client: updatedClient
      }

    },
    deleteClient: async (_, { id }) => {
      let error = null
      // Invalid user input
      if(!isObjectIdValid(id)) {
        error = new Error('Este ID no es válido')
        error.code = 400
        error.solution = 'Ingrese un ID valido'
        throw error
      }

      // Find client to delete
      const client = await Client.findById(ObjectId(id))

      // Client not found
      if (client == null) {
        error = new Error('Cliente no encontrado')
        error.code = 404
        error.solution = 'Revisa el ID proveido'
        throw error
      }

      // Delete operation
      await client.deleteOne()
      // Correct deletion
      return {
        message: `Cliente [${client.name}] ha sido borrado.`,
        code: 200,
        success: true
      }
    }
  }
}
