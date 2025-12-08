const mongoose = require('mongoose');
// validator library 
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        },
    },
    password:{
        type: String,
        required: true,
         validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password");
            }
        },

    },
    age:{
        type: Number,
        min: 18,
    
    },
    gender: {
        type: String,
        // this validate only check for new data being added to the database
        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("URL is not valid");
            }
        },
    },
    about: {
        type: String,
        default: "This is a default about of the user!",
    },
    skills: {
        type: [String],
    },

}, {timestamps:true,}
);

// get token from userSchema methods
userSchema.methods.getJWT = async function () {
    const user = this;
   const token =  await jwt.sign({_id: user._id },"DEV@Tinder$790", {
                expiresIn: "1 days",
            });
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid;
    
};
  
 module.exports = mongoose.model('User',userSchema);
