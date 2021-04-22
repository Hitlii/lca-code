const userResolver  = require('./user');
const clientResolver  = require('./client');

// Modularizing the scheme to improve maintenance
module.exports = [
    userResolver,
    clientResolver
]