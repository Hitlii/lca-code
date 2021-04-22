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
        createClient: async (_, {name, gender, birthday, email, phone, city, state,address}) => {
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
            // DB Client Creation
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