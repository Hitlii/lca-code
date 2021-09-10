const ClientSchema = require('../../models/clients')
const TicketSchema = require('../../models/tickets')
const PropertySchema = require('../../models/properties')
const ObjectId = require('mongoose').Types.ObjectId
const { isObjectIdValid } = require('../helper/validators')
const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated } = require('./middleware')

// 

module.exports = {
  Query: {
    getClient: combineResolvers(isAuthenticated, async (_, { _id }, context) => {
      try {
        const Client = context.dbConn.model('clients', ClientSchema)

        const client = await Client.findById(ObjectId(_id))
        return client || null
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
    getClients: combineResolvers(isAuthenticated, async (_,{name}, context) => {
      try {
        let search = {}
        const Client = context.dbConn.model('clients', ClientSchema)

        if(name)
        search = { $text: { $search: name } }
        
        const clients = await Client.find({...search})
        return clients || null
      } catch (error) {
        console.log(error)
        throw error
      }
    })
  },
  Mutation: {
    createClient: combineResolvers(isAuthenticated, async (_, { client },context) => {
      // Input validation
      // const clientValidationError = new clientInputValidator(client)

      // Invalid user input
      /* if (clientValidationError) {
        let error = new Error('Error validando inputs de cliente')
        error.code = 400
        error.data = clientValidationError
        error.solution = 'Revise los campos enviados'
        throw error
      } */

      const Client = context.dbConn.model('clients', ClientSchema)

      const newClient = new Client({ ...client })

      // DB Client Creation
      await newClient.save()

      return {
        code: 201,
        success: true,
        message: 'Cliente creado existosamente.',
        client: newClient
      }
    }),
    updateClient: combineResolvers(isAuthenticated, async (_, { _id, name, gender, birthday, email, phone, city, state, address }, context) => {
      const Client = context.dbConn.model('clients', ClientSchema)
      const Property = context.dbConn.model('properties', PropertySchema)
      const Ticket = context.dbConn.model('tickets', TicketSchema)
      let error = null
      if (!isObjectIdValid(_id)) {
        error = new Error('Este ID no es válido')
        error.code = 400
        error.solution = 'Ingrese un ID valido'
        throw error
      }

      // Find client to update
      const client = await Client.findById(ObjectId(_id))

      // Client not found
      if (client == null) {
        error = new Error('Cliente no encontrado')
        error.code = 404
        error.solution = 'Revisa el ID proveido'
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
        ObjectId(_id),
        { $set: tempClient },
        { new: true }
      )

      // Search and update client-owned properties
      await Property.updateMany(
        { 'vendors._id': client._id },
        {
          '$set': {
            "vendors.$": {
              '_id': client._id,
              'name': updatedClient.name,
              'contact.email': updatedClient.email,
              'contact.phone': updatedClient.phone
            }
          }
        })
      // console.log(clientProperties.n + ' properties found.')
      // console.log(clientProperties.nModified + ' properties updated.')

      // Search and update client-owned tickets
      await Ticket.updateMany(
        { 'clients._id': client._id }, 
        {
          '$set': {
            'clients.$': {
              '_id': client._id,
              'name': updatedClient.name
            }
          }
        })
      // console.log(clientTickets.n + ' ticket(s) found.')
      // console.log(clientTickets.nModified + ' ticket(s) updated.')

      // Return updated fields
      return {
        code: 200,
        success: true,
        message: 'Datos modificados con exito.',
        client: updatedClient
      }
    }),
    deleteClient: combineResolvers(isAuthenticated, async(_, { _id }, context) => {
      let error = null
      const Property = context.dbConn.model('properties', PropertySchema)
      const Ticket = context.dbConn.model('tickets', TicketSchema)
      const Client = context.dbConn.model('clients', ClientSchema)
      // Invalid user input
      if (!isObjectIdValid(_id)) {
        error = new Error('Este ID no es válido')
        error.code = 400
        error.solution = 'Ingrese un ID valido'
        throw error
      }

      // Find client to delete
      const client = await Client.findById(ObjectId(_id))

      // Client not found
      if (client == null) {
        error = new Error('Cliente no encontrado')
        error.code = 404
        error.solution = 'Revisa el ID proveido'
        throw error
      }

      // Check whether the client has registered properties, throw error if so.
      const properties = await Property.findOne({vendors: {$elemMatch: {_id: client._id}}})
      if (properties) {
        error = new Error('Cliente incapaz de ser eliminado')
        error.code = 409
        error.solution = 'Revisa que el cliente no tenga propiedades registradas'
        throw error
      }

      // Check whether the client has registered tickets, throw error if so.
      const tickets = await Ticket.findOne({clients: {$elemMatch: {_id: client._id}}})
      // console.log(tickets)
      if (tickets) {
        error = new Error('Cliente incapaz de ser eliminado')
        error.code = 409
        error.solution = 'Revisa que el cliente no tenga tickets registrados'
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
    })
  }
}
