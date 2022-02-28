const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: false,
        validate: [isEmail, 'Please enter a valid email']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;