const { isObjectIdValid } = require('../helper/validators')
// const Client = require('../../models/clients')
const TicketSchema = require('../../models/tickets')
const PropertySchema = require('../../models/properties')
const ObjectId = require('mongoose').Types.ObjectId
const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated } = require('./middleware')

module.exports = {
  Mutation: {
    /**
      @description Creates a ticket
      @param {ticket} ticket A new ticket
      @param {clients} clients Array of existing clients and new clients
    */
    createTicket: combineResolvers(isAuthenticated, async (_, { ticket, clients }, context) => {
      let error = null
      const Property = context.dbConn.model('properties', PropertySchema)
      const Ticket = context.dbConn.model('tickets', TicketSchema)
      // Searching property.
      const property = await Property.findOne({ _id: ObjectId(ticket.propertyId) }).select('tickets')

      // Propert not found 404
      if (property === null) {
        error = new Error('Propiedad no encontrada')
        error.solution = 'Es probable que esta propiedad haya sido eliminada, recargue la pagina para verificar'
        error.code = 404
        throw error
      }

      // Creating new ticket
      const newTicket = new Ticket({ ...ticket, clients })
      property.tickets ? property.tickets.push(newTicket) : property.tickets = [newTicket]

      // Saving on DB
      await property.save()
      await newTicket.save()

      return {
        message: 'Ticket Creado',
        code: 200,
        success: true,
        ticket: newTicket
      }
    }),
    updateTicket: combineResolvers(isAuthenticated, async (_, { ticket, clients }, context) => {
      try {
        const Ticket = context.dbConn.model('tickets', TicketSchema)
        let updatedTicket = {
          ...ticket, clients
        }
        updatedTicket = await Ticket.findByIdAndUpdate(
          ObjectId(ticket._id),
          { $set: updatedTicket },
          { new: true }).exec()

        if (updatedTicket === null) {
          const error = new Error('Ticket no encontrado')
          error.code = 404
          throw error
        }
        return {
          message: 'Ticket actualizado',
          ticket: updatedTicket,
          success: true,
          code: 200
        }
      } catch (error) {
        if (error.code && error.code === 404) throw error
        error.message = 'Error al actualizar el ticket'
        error.code = 500
        throw error
      }
    }),
    /**
            @description Deletes a ticket
            @param {String} id id of the ticket
            @returns {MutationResponse} With a code message and success status
         */
    deleteTicket: combineResolvers(isAuthenticated, async (_, { _id, propertyId }, context) => {
      const Property = context.dbConn.model('properties', PropertySchema)
      const Ticket = context.dbConn.model('tickets', TicketSchema)
      
      let error = null

      // Invalid ID
      if (!isObjectIdValid(_id) || !isObjectIdValid(propertyId)) {
        error = new Error('\'Este ID no es valido\'')
        error.code = 400
        error.solution = 'Ingrese un ID valido (está mandando un string?)'
        throw error
      }

      const ticket = await Ticket.findById(ObjectId(_id), 'propertyId').exec()
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
    })
  },
  Query: {
    getTickets: combineResolvers(isAuthenticated, async (_, { propertyId }, context) => {
      const Ticket = context.dbConn.model('tickets', TicketSchema)
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
    }),
    getTicket: combineResolvers(isAuthenticated, async (_, { _id },context) => {
      let error = null
      const Ticket = context.dbConn.model('tickets', TicketSchema)

      if (!isObjectIdValid(_id)) {
        error = new Error('\'Este ID no es valido\'')
        error.code = 400
        error.solution = 'Ingrese un ID valido (está mandando un string?)'
        throw error
      }

      const ticket = await Ticket.findOne({ _id }).exec()
      return ticket
    })
  }
}
