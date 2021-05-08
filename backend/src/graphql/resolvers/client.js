const Client = require('../../models/clients')

module.exports = {
  Query: {
    getClient: async (_, { name }) => {
      try {
        const client = await Client.findOne({ name })
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
    createClient: async (_, { name, gender, birthday, email, phone, city, state, address }) => {
      const client = new Client({
        name,
        gender,
        birthday,
        contact: {
          email,
          phone
        },
        location: {
          city,
          state,
          address
        }
      })

      try {
        // DB Client Creation
        const newClient = await client.save()
        return newClient
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    updateClient: async (_, { id, name, gender, birthday, email, phone, city, state, address }) => {
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
      Object.keys(tempClient).forEach((k) => tempClient[k] == null && tempClient[k] == undefined && delete tempClient[k]);

      try {
        // Wait for update operation
        const updatedClient = await Client.findByIdAndUpdate(
          { _id: id },
          { $set: tempClient },
          { new: true }
        )
        // Return updated fields
        return updatedClient
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    deleteClient: async (_, { id }) => {
      // Find client to delete
      const client = await Client.findById(id)
      try {
        // Wait for delete operation
        await client.deleteOne()
        // Indicate correct deletion
        return true
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
}
