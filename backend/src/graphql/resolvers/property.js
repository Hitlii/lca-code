const Property = require('../../models/properties')
const ObjectId = require('mongoose').Types.ObjectId
const { isObjectIdValid } = require('../helper/validators')
const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated } = require('./middleware')

module.exports = {
  Mutation: {
    createProperty: combineResolvers(isAuthenticated, async (_, { property, vendors }) => {
      const newProperty = new Property({ ...property, vendors })
      newProperty.meta.url = newProperty.title.replace(/\s+/g, '-').toLowerCase() + '-' + newProperty.code
      try {
        await newProperty.save()
      } catch (error) {
        error.message = 'Error al crear la propiedad'
        throw error
      }

      return {
        message: 'Propiedad creada',
        code: 201,
        success: true,
        url: newProperty.meta.url
      }
    }),

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

  },
  Query: {
    getProperties: async (_, { filter }) => {
      const mongoFilter = {}
      let search = {}
      if (filter !== {}) {
        const keys = Object.keys(filter)

        // Get Fields for filter
        keys.forEach(key => {
          if (key === 'city') {
            mongoFilter['location.city'] = {}
            mongoFilter['location.city'] = filter[key]
            return
          }
          if (key === 'search') {
            search = { $text: { $search: filter[key] } }
            return
          }
          mongoFilter[key] = {}
          if (key === 'price') {
            const { minPrice, maxPrice } = filter.price
            mongoFilter[key] = { $lte: maxPrice, $gte: minPrice }
            return
          }
          if (key === 'area') {
            const { minArea, maxArea } = filter.area
            mongoFilter[key] = { $lte: maxArea, $gte: minArea }
            return
          }

          mongoFilter[key] = filter[key]
        })
      }
      const projection = {
        status: 1,
        zone: 1,
        type: 1,
        area: 1,
        price: 1,
        specialPrice: 1,
        onPayments: 1,
        currency: 1,
        'location.state': 1,
        'location.city': 1,
        'location.address': 1,
        'description.isDeeded': 1,
        'description.hasAllServices': 1,
        'meta.url': 1,
        'media.images': { $slice: 1 }
      }

      try {
        const properties = await Property.find({ ...mongoFilter, ...search }, projection).limit(10)
        return properties
      } catch (error) {
        error.message = 'Error al cargar las propiedades'
        error.solution = 'Puede que se haya perdido la conexión'
        error.code = 418
        throw error
      }
    },
    getProperty: async (_, { url }) => {
      const projection = {
        vendors: 0,
        tickets: 0
      }

      try {
        const property = await Property.findOne({ 'meta.url': url }, projection).exec()
        return property
      } catch (error) {
        error.message = 'Error al cargar la propiedad'
        error.solution = 'Es posible que este URL este roto'
        error.code = 404
        throw error
      }
    },
    getAdminProperties: async (_, { filter }) => {
      let search = {}
      if (filter.search) { search = { $text: { $search: filter.search } } }
      const projection = {
        code: 1,
        status: 1,
        zone: 1,
        area: 1,
        'location.state': 1,
        'location.city': 1,
        'location.address': 1,
        'meta.url': 1,
        'media.images': { $slice: 1 }
      }

      try {
        const properties = await Property.find({ ...search }, projection).limit(10)
        return properties
      } catch (error) {
        error.message = 'Error al cargar las propiedades'
        error.solution = 'Puede que se haya perdido la conexión'
        error.code = 418
        throw error
      }
    }

  }
}
