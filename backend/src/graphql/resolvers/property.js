const Property = require('../../models/properties')
const Client = require('../../models/clients')
const ObjectId = require('mongoose').Types.ObjectId
const { isObjectIdValid } = require('../helper/validators')
module.exports = {
  Mutation: {

    createProperty: async (_, { property, clients }) => {
      const newClients = []
      const existingClients = []
      let createdClients = []

      // Seperating existing clients from new clients
      for (const client of clients) {
        // A client with an id will be an existing client
        client.id ? existingClients.push(client) : newClients.push(client)
      }

      if (newClients.length !== 0) {
        // Creating the new clients
        createdClients = await Client.insertMany(newClients)
      }

      const newProperty = new Property({ ...property, vendors: [...existingClients, ...createdClients] })
      newProperty.meta.url = process.env.BASE_URL +
                    process.env.PORT + '/' +
                    newProperty.title.replace(/\s+/g, '-').toLowerCase() + '-' +
                    newProperty.code

      await newProperty.save()

      return {
        message: 'Propiedad creada',
        code: 201,
        success: true,
        url: newProperty.meta.url
      }
    },

    deleteProperty: async (_, { id }) => {
      let error = null
      // 400 Invalid user input
      if (!isObjectIdValid(id)) {
        error = new Error('Este ID no es valido')
        error.code = 400
        error.solution = 'Ingrese un ID valido (está mandando un string?)'
        throw error
      }

      const property = await Property.findById(ObjectId(id), 'tickets code').exec()

      // 404 Property not found
      if (property == null) {
        error = new Error('Propiedad no encontrada')
        error.solution = 'Es probable que esta propiedad haya sido eliminada, recargue la pagina para verificar'
        error.code = 404
        throw error
      }

      // 409 Cannot delete property
      if (typeof property.tickets !== 'undefined') {
        error = new Error('No puedes eliminar una propiedad que ya tiene tickets.')
        error.solution = 'Si desea eliminar esta propiedad, primero deberá de eliminar los tickets'
        error.code = 409
        throw error
      }

      // Deleting property.
      await Property.deleteOne({ _id: property._id })

      return {
        message: `La propiedad ${property.code} ha sido eliminada`,
        code: 200,
        success: true
      }
    }

  }
}
