// starting point of application where we write all nodejs code
// to get rid from closing server and re-run server use nodemon:-  npm i -g nodemon== it auto-refresh our server aftr   done any changes
const express = require("express");
const connectDB= require("./config/database");
const app = express(); //creating new expressjs app or web server
const User = require("./models/user"); 

// Middleware activated for all the routes,it reads the json in postman convert into js obj and add js object back to req
app.use(express.json());

// sending data to database
app.post("/signup",async (req,res)=>{
    // Creating a new instance of the User model
    const user = new User(req.body);
    try{
    await user.save();
    res.send("User Added successfully!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});

// Get user by email
app.get("/user",async (req,res)=>{
  const userEmail = req.body.emailId;

  try{
    const users = await User.find({emailId: userEmail});
    if(users.length === 0){
          res.status(404).send("User not found");
    } else {
        res.send(users);
    }
  
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API - GET /feed -get all the users from the database
app.get("/feed", async (req,res)=>{
    try{
        const users =  await User.find({});
        res.send(users);
    } catch (err) {
        res.status.send("Something went wrong");
    }
});
// Delete a user from the database
app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted Successfully");
    } catch (err){
        res.status(400).send("Something went wrong");
    }
});
// Update data of the user
app.patch("/user", async (req,res)=>{
    const userId = req.body.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate({_id: userId }, data, {
            runValidators: true,
        });
        res.send("User updated sucessfully");
    } catch (err){
        res.status(400).send("Something went wrong");
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
 
