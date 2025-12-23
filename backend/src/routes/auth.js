const express = require('express');
const authRouter = express.Router();

const User = require('../models/user');
const {validateSignupData} = require('../utils/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



authRouter.post("/signup",  async (req,res)=>{
       try {
    // Validation of data
     validateSignupData(req);

     const { firstName, lastName, emailId, password, age,gender} =req.body;
    // /Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    // creating a new user instance
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        age,
        gender,
    });
 
  const savedUser = await user.save(); 
  const token = await savedUser.getJWT();

  res.cookie("token", token, {
    httpOnly: true,
     secure:true,
    sameSite:"none",
  expires: new Date(Date.now() + 8 * 3600000), // 1 day
  });
   res.json({ message: "User Added succcessfully!", data: savedUser});
    }  catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
   

});

authRouter.post("/login", async (req,res)=> { 
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error ("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            // Create a JWT token
            const token = await user.getJWT();
            // Add token to cookie and send the response back to user
            res.cookie("token",token, { 
                secure:true,
                sameSite:"none",
                expires: new Date(Date.now() + 8 * 3600000), // 1 day
                
            });
            res.send(user);
        } else {
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        res.status(400).send("Login failed: " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout successful");
}); 
 
module.exports = authRouter;