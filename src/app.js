// starting point of application where we write all nodejs code
// to get rid from closing server and re-run server use nodemon:-  npm i -g nodemon== it auto-refresh our server aftr   done any changes
const express = require("express");
const connectDB= require("./config/database");
const app = express(); //creating new expressjs app or web server
const User = require("./models/user"); 

// sending data to database
app.post("/signup",async (req,res)=>{
    // Creating a new instance of the User model
    const user = new User({
       firstName: "Puja",
       lastName: "Keshri",
       emailId: "pujakeshri123@gmail.com",
       password:"puja@123",
    });
    try{
    await user.save();
    res.send("User Added successfully!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});
connectDB()
.then(()=>{
    console.log("Database connection established");
    // once db connection success then app should listen
    app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000...");
 });
})
.catch((err) =>{
    console.error("Database cannot be connected");
});
 
