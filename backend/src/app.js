const express= require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

// express json middleware to convert  body's json data to js object
app.use(express.json());

// const { adminAuth ,userAuth} = require("./middlewares/auth");
// app.use("/admin", adminAuth);
// app.get("/user" , userAuth, (req,res)=>{
//     res.send( { firstName: "Puja", lastName: "Keshri"});
// });
// app.get("/admin/getAllData", (req,res) => {
//     res.send("All Data Sent");
// });

app.post("/signup",  async (req,res)=>{
    
    const user = new User(req.body);
    try {
  await user.save(); 
   res.send("User Added successfully");
    }  catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
   

});

// Get user by email
app.get("/user", async (req,res)=>{
    const userEmail = req.body.emailId;
    try {
        const users = await User.find({emailId: userEmail});
        if(users.lenght === 0) {
             res.status(404).send("User not found");
        } else {
            res.send(users);
        }
        
    } catch (err) {
        res.status(400).send("Error fetching user:" + err.message);
    }
});
// Feed API-get all the users from the database
app.get("/feed", async (req,res)=>{
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong ");
    }
});
// Delete a user from the database by using userId
app.delete("/user", async (req,res) =>{
   const userId = req.body.userId;
   try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
   } catch (err) {
    res.status(400).send("Error deleting user: " + err.message);
   }
});
// update data of the user
app.patch("/user", async (req,res)=>{
    const userId = req.body.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate({_id: userId },data, {
            returnDocument: 'after',
            runValidators: true,
        });
        res.send("User data updated successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});



// first connect to database then listen to server
connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(3000, ()=>{
    console.log("server listening on port 3000");
});
})
.catch((err) =>{
    console.log("Database connection failed", err);
});



