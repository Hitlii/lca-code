const User = require('../models/user.js'); 
const { UserInputError } = require('apollo-server');

const  jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    Query: {
            async user(parent,{id}){
            const user = await User.findOne({_id:id});
            return user || null;
        },
            async viewer(parent, args, {user}){
                const userFounded  = await User.findOne({email: user.subject});
                if(!userFounded) throw new UserInputError('Error: Usuario no encontrado!');

                return userFounded;
        }
    },
    Mutation: {
        async login(parent, args){
            // Find User
            const user = await User.findOne({ email : args.email });
          
             // User not found
            if(!user) throw new UserInputError('Error: Email not found');

            // Comparing password
            const passPassed = await bcrypt.compare(args.password, user.password)
            if(!passPassed) throw new UserInputError('Error: Invalid Password');

            // Returning jwt token string or throwing a password validation error.
            return jwt.sign(
                    { id:user._id, loggedIn:true }, 
                    process.env.SUPER_SECRET, 
                    {algorithm: "HS256", subject: user.email, expiresIn: 3000}
                );

        }
    }
}