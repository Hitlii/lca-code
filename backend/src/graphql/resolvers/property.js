const { UserInputError } = require("apollo-server-errors");
const Property = require("../../models/properties");
const Client = require("../../models/clients");

module.exports = {
    Mutation: {

        createProperty: async (_, { property, clients }) => {

            try {
                
                let newClients = [];
                let existingClients = [];
                let createdClients = [];

                // Seperating existing clients from new clients
                for (const client of clients) {
                    // A client with an id will be an existing client
                    client.id? existingClients.push(client): newClients.push(client);
                }
                
                if(newClients.length !== 0){
                    // Creating the new clients
                    createdClients = await Client.insertMany(newClients);
                }
                

                
                let newProperty = new Property({...property, vendors:[...existingClients, ...createdClients]})
                newProperty.meta.url = process.env.BASE_URL + 
                    process.env.PORT +'/'+
                    newProperty.status +'/'+
                    newProperty.type +'/'+
                    newProperty.zone +'/'+
                    newProperty.title.replace(/\s+/g, '-').toLowerCase()+'-'+
                    newProperty.code

                    
                await newProperty.save();

                return newProperty.meta.url;
                
            } catch (error) {
                console.log(error)
            }
            
        }   
    }
}