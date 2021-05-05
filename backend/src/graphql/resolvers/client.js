const { UserInputError } = require("apollo-server-errors");
const Client = require("../../models/client");

module.exports = {
    Query: {
        getClient: async(_, { name }) => {
            try {
                const client = await Client.findOne({ name });
                return client || null;
            } catch(error) {
                console.log(error);
                throw error;
            }
        },
        getClients: async() => {
            try {
                const clients = await Client.find({});
                return clients || null;
            } catch(error) {
                console.log(error);
                throw error;
            }
        }
    },
    Mutation: {
        createClient: async (_, {name, gender, birthday, email, phone, city, state, address}) => {
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
            });

            try {
                // DB Client Creation
                const newClient = await client.save();
                return newClient;
            } catch(error) {
                console.log(error);
                throw error;
            }
        },
        updateClient: async (_, args) => {
            // Set fields to update
            const tempClient = {
                name: args.name,
                gender: args.gender,
                birthday: args.birthday,
                contact: {
                    email: args.email,
                    phone: args.phone
                },
                location: {
                    city: args.city,
                    state: args.state,
                    address: args.address
                }
            };
            
            try {
                // Wait for update operation
                const updatedClient = await Client.findByIdAndUpdate(
                    args.id, 
                    { $set: tempClient }, 
                    { new: true }
                );
                // Return updated fields
                return updatedClient;
            } catch(error) {
                console.log(error);
                throw error;
            }
        },
        deleteClient: async (_, { id }) => {
            // Find client to delete
            const client = await Client.findById(id);
            try {
                // Wait for delete operation
                await client.deleteOne();
                // Indicate correct deletion
                return true;
            } catch(error) {
                console.log(error);
                throw error;
            }
        }
    }
}