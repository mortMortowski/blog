const User = require('../models/User');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {username: '', password: '', email: ''};

    //duplicate error code
    if(err.code === 11000){
        errors.username = 'That username is already taken';
        return errors;
    }

    //validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

module.exports.signup_get = (req, res) => {
    res.render('signup.ejs');
}

module.exports.login_get = (req, res) => {
    res.render('login.ejs');
}

module.exports.signup_post = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    try{
        const user = await User.create({username, password, email});
        res.status(201).json(user);
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.login_post = async (req, res) => {
    res.send('user login');
}