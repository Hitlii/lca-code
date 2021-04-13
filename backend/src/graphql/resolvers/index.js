const userResolver  = require('./user');

// Modularizing the scheme to improve maintenance
module.exports = [
    userResolver
]