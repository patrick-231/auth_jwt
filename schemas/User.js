const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        requireed: true,
    },
});

//creating a custom static method 
userSchema.statics.signup = async function(email, password){
   
      //validation
    const exists = await this.findOne({email});
    if(exists) {
        throw Error('Email already in use')
    }
     
    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('inValid Email')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough. Make sure to use 8 characters, one uppercase, one lowercase, a number and a symbol.');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password: hash})

    return user;
    };

    userSchema.statics.login = async function (email,password){
        if(!email || !password) {
            throw Error('All fields must be filled')
        }
        const user = await this.findOne({email});
        if(!user){
            throw Error('Incorrect email')
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match) {
            throw Error('Incorrect password')
        }
        return user;
    }


module.exports = mongoose.model('User', userSchema);