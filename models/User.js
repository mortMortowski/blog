<<<<<<< HEAD
const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

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
        validate: [isEmail, 'Please enter a valid email']
    }
});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method to login user
userSchema.statics.login = async function(username, password){
    const user = await this.findOne({username});
    if (user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect username');
}

const User = mongoose.model('User', userSchema);

=======
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

>>>>>>> 4bb19d2e241ffec822f7ed907735e18f84e2ced0
module.exports = User;