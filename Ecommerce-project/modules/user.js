const {JsonWebTokenError} = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Creating a user Schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25
    },
    hashedPassword: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
    },
    bag: {
        type: [String],
    },
    favorite: {
        type: [String],
    },
    isAdmin: {
        type: Boolean,
        required:true
    }
});

userSchema.methods.generateToken = function () {
    return jwt.sign({_id: this._id, name: this.name, email: this.email, isAdmin: this.isAdmin}, "jwtPrivateKey");

}
// Creating a model from a Schema 

const User = mongoose.model('User', userSchema);

exports.User = User;