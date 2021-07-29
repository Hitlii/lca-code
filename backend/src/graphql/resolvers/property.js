const Property = require('../../models/properties')
const ObjectId = require('mongoose').Types.ObjectId
const { isObjectIdValid } = require('../helper/validators')
const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated } = require('./middleware')

const PROPERTIES_PER_PAGE = 12
// Client card property projection
// Figma component -> https://www.figma.com/file/Zuolu9jlRGMlKDreja7g20/LCA?node-id=180%3A147
const CLIENT_PROPERTY_CARD = {
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
// Admin property card projection
// Figma component -> https://www.figma.com/file/Zuolu9jlRGMlKDreja7g20/LCA?node-id=1751%3A40
const ADMIN_PROPERTY_CARD = {
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

// Single property render
const ADMIN_PROPERTY = {
  status: 1,
  title: 1,
  'location.state': 1,
  'location.city': 1,
  'location.address': 1,
  'meta.url': 1,
  'media.images': { $slice: [1, 1] },
  vendors: 1,
  tickets: 1
}

// Single client property
const CLIENT_PROPERTY = {
  vendors: 0,
  tickets: 0,
  'media.images': { $slice: [1, 50] }
}

module.exports = {
  Mutation: {
    createProperty: combineResolvers(isAuthenticated, async (_, { property, vendors }) => {
      const newProperty = new Property({ ...property, vendors })
      newProperty.meta.url = newProperty.title.replace(/\s+/g, '-').toLowerCase() + '-' + newProperty.code
      // Saving only youtube ID
      console.log(newProperty)
      const videoID = newProperty.media.video.split('/')
      newProperty.media.video = videoID[videoID.length - 1]
      console.log(newProperty.media.video)
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

    deleteProperty: combineResolvers(isAuthenticated, async (_, { _id }) => {
      let error = null
      // 400 Invalid user input
      if (!isObjectIdValid(_id)) {
        error = new Error('Este ID no es valido')
        error.code = 400
        error.solution = 'Ingrese un ID valido (está mandando un string?)'
        throw error
      }

      const property = await Property.findById(ObjectId(_id), 'tickets code').exec()

      // 404 Property not found
      if (property == null) {
        error = new Error('Propiedad no encontrada')
        error.solution = 'Es probable que esta propiedad haya sido eliminada, recargue la pagina para verificar'
        error.code = 404
        throw error
      }

      // 409 Cannot delete property
      if (property.tickets.length > 0) {
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
    })

  },
  Query: {
    getProperties: async (_, { filter, order, pagination }) => {
      const mongoSkip = pagination.pageNumber > 0 ? (pagination.pageNumber - 1) * PROPERTIES_PER_PAGE : 0
      const mongoSort = {}
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
          if (key === 'title') mongoFilter[key] = { $nin: ['Vendido', 'Oculto'] }
          if (key === 'area') {
            const { minArea, maxArea } = filter.area
            mongoFilter[key] = { $lte: maxArea, $gte: minArea }
            return
          }

          mongoFilter[key] = filter[key]
        })
      }
      if (order !== {}) {
        Object.keys(order).forEach(key => {
          mongoSort[key] = order[key]
        })
      }

      try {
        const properties = await Property.find(
          { ...mongoFilter, ...search },
          CLIENT_PROPERTY_CARD,
          { sort: mongoSort }).skip(mongoSkip).limit(PROPERTIES_PER_PAGE)
        return properties
      } catch (error) {
        error.message = 'Error al cargar las propiedades'
        error.solution = 'Puede que se haya perdido la conexión'
        error.code = 418
        throw error
      }
    },
    getProperty: async (_, { url }) => {
      try {
        const property = await Property.findOne({ 'meta.url': url }, CLIENT_PROPERTY).exec()
        const mongooseFilter = {
          status: property.status,
          type: property.type,
          zone: property.zone,
          'location.city': property.location.city,
          _id: { $ne: property._id }
        }
        const relatedProperties = await Property.find({ ...mongooseFilter }, CLIENT_PROPERTY_CARD).limit(5)
        return {
          property,
          relatedProperties
        }
      } catch (error) {
        error.message = 'Error al cargar la propiedad'
        error.code = 404
        throw error
      }
    },
    getAdminProperties: combineResolvers(isAuthenticated, async (_, { filter, pagination }) => {
      const mongoSkip = pagination.pageNumber > 0 ? (pagination.pageNumber - 1) * PROPERTIES_PER_PAGE : 0
      let search = {}
      if (filter.search) { search = { $text: { $search: filter.search } } }
      try {
        const properties = await Property.find({ ...search }, ADMIN_PROPERTY_CARD).skip(mongoSkip).limit(PROPERTIES_PER_PAGE)
        return properties
      } catch (error) {
        error.message = 'Error al cargar las propiedades'
        error.solution = 'Puede que se haya perdido la conexión'
        error.code = 418
        throw error
      }
    }),
    getAdminProperty: combineResolvers(isAuthenticated, async (_, { url }) => {
      try {
        const property = await Property.findOne({ 'meta.url': url }, ADMIN_PROPERTY).exec()
        return property
      } catch (error) {
        error.message = 'Error al cargar la propiedad'
        error.code = 404
        throw error
      }
    }),
    getAllProperties: async (isAdminCard) =>{
      try{  
        const allProperties = await Property.find({}, isAdminCard? ADMIN_PROPERTY_CARD:CLIENT_PROPERTY_CARD).exec()
        return allProperties
      }catch(error){
        error.message = 'Error al cargar todas las propiedades'
        error.code= 400
        throw error
      }
    },
    getFeaturedProperties: async () => {
      try {
        const featuredProperties = await Property.find({ isFeatured: true }, CLIENT_PROPERTY_CARD).exec()
        return featuredProperties
      } catch (error) {
        error.message = 'Error al cargar las propiedades destacadas'
        error.code = 400
      }
    }

  }
}
