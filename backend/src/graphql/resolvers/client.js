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
        createClient: async (_, args) => {
            const client = new Client({
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
            });

            const newClient = await client.save();
            return newClient;
        },
        updateClient: async (_, args) => {
            return;
        },
        deleteClient: async (_, { name }) => {
            return Client.findOneAndDelete(
                { name },
                (err) => {
                    if(err) throw new UserInputError("Hubo un problema borrando al cliente");
                }
            );
        }
    }
}