// Handle Auth Middleware for all GET POST,... requests
// this middleware only be called for /user
const jwt = require('jsonwebtoken');
const User = require("../models/user");

 const userAuth= async (req,res,next)=>{
//  Read the token from the req cookies
try {
    const {token} = req.cookies;
    if (!token) {
        throw new Error("Token is not valid!!!!!");
    }
    //Validate my token
const decodedObj = await jwt.verify(token,"DEV@Tinder$790");
const {_id} = decodedObj;
const user = await User.findById(_id);
if (!user){
    throw new Error("User not found");
}
req.user =user;
next();
 } catch (err) {
 res.status(400).send("ERROR: " +err.message);
 }
// Validate the token
// Find the user
};
module.exports={userAuth};