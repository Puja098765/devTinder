const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req,res,next) =>{
    try{
//    Read the token from the req cookies 
const {token} = req.cookies;
if(!token){
    throw new Error("No token found");
}
 // Validate the token
const decodeObj = await jwt.verify(token, "DEV@Tinder$790");
const {_id} = decodeObj;
//  Find the user
const user = await User.findById(_id);
if(!user){
    throw new Error("User not found");
}
req.user = user;
next();
} catch(err){
    res.status(401).send("Authentication failed: " + err.message);
}



   
};

module.exports = {
     userAuth
};