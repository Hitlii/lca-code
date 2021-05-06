const Ticket = require('../../models/tickets')
const { clientFilter } = require('../helper/filters')
const { ticketInputValidator, isObjectIdValid } = require('../helper/validators')
const Client = require('../../models/clients')
const Property = require('../../models/properties')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  Mutation: {
    /**
            @description Creates a ticket
            @param {ticket} ticket A new ticket
            @param {clients} clients Array of existing clients and new clients
         */
    createTicket: async (_, { ticket, clients }) => {
      let error = null
      // Sanitizing and validating input
      const ticketValidationErrors = ticketInputValidator(ticket)
      const { existingClients, newClients, validationErrors: clientValidationErrors } = await clientFilter(clients)

      // Joininig errors
      if (ticketValidationErrors || clientValidationErrors) {
        error = new Error('Error validando inputs')
        error.data = { ...clientValidationErrors, ...ticketValidationErrors }
        error.code = 400
        error.solution = 'Modifique los campos'
        throw error
      }

      // Searching property.
      const property = await Property.findOne({ _id: ObjectId(ticket.propertyId) }).select('tickets')

      // Propert not found 404
      if (property === null) {
        error = new Error('Propiedad no encontrada')
        error.solution = 'Es probable que esta propiedad haya sido eliminada, recargue la pagina para verificar'
        error.code = 404
        throw error
      }

      // Creating new clients
      const createdClients = await Client.insertMany(newClients)
      // Creating new ticket
      const newTicket = new Ticket({ ...ticket, clients: [...existingClients, ...createdClients] })
      property.tickets ? property.tickets.push(newTicket._id) : property.tickets = [newTicket._id]

      // Saving on DB
      await property.save()
      await newTicket.save()

      return {
        message: 'Ticket Creado',
        code: 200,
        success: true,
        ticket: newTicket
      }
    },
    /**
            @description Deletes a ticket
            @param {String} id id of the ticket
            @returns {MutationResponse} With code and message
         */
    deleteTicket: async (_, { id, propertyId }) => {
      let error = null

      // Invalid ID
      if (!isObjectIdValid(id) || !isObjectIdValid(propertyId)) {
        error = new Error('\'Este ID no es valido\'')
        error.code = 400
        error.solution = 'Ingrese un ID valido (está mandando un string?)'
        throw error
      }

      const ticket = await Ticket.findById(ObjectId(id), 'propertyId').exec()
      if (ticket === null) {
        error = new Error('Ticket no encontrado')
        error.solution = 'Es probable que este ticket haya sido eliminado, recargue la pagina para verificar'
        error.code = 404
        throw error
      }

      const property = await Property.findById(ObjectId(ticket.propertyId), 'tickets').exec()
      if (property === null) {
        error = new Error('Propiedad no encontrada')
        error.solution = 'Es probable que esta propiedad haya sido eliminada, recargue la pagina para verificar'
        error.code = 404
        throw error
      }

      property.tickets.pull(ticket._id)

      await ticket.deleteOne()
      await property.save()

      return {
        message: 'El ticket ha sido eliminado',
        success: true,
        code: 200
      }
    }
  },
  Query: {
    getTickets: async (_, { propertyId }) => {
      let error = null
      if (!isObjectIdValid(propertyId)) {
        error = new Error('\'Este ID no es valido\'')
        error.code = 400
        error.solution = 'Ingrese un ID valido (está mandando un string?)'
        throw error
      }
      // Need of pagination here?
      const tickets = await Ticket.find({ propertyId }, '-promissory -paymentLocation -paymentAddress')
      return tickets
    }
  }
}
