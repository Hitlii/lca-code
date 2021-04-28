const userResolver  = require('./user');
const clientResolver  = require('./client');
const propertyResolver = require('./property');

const interfaceResolver = {
    Location: {
        __resolveType(location, context, info){
            if(location.coordinates) return 'PropertyLocation';
            return 'ClientLocation'
        }
    }
}
// Modularizing the scheme to improve maintenance
module.exports = [
    interfaceResolver,
    userResolver,
    clientResolver,
    propertyResolver

]