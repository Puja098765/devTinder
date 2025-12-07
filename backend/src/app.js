const express= require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const {validateSignupData} = require('./utils/validation');
const bcrypt = require('bcrypt');

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
 
  await user.save(); 
   res.send("User Added successfully");
    }  catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
   

});

app.post("/login", async (req,res)=> {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error ("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.send("Login Successful");
        } else {
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        res.status(400).send("Login failed: " + err.message);
    }
})

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
app.patch("/user/:userId", async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

    // Data sanitizing - API  level validation on patch request for allowed updates
    try {
        const ALLOWED_UPDATES =[
        "photoUrl",
        "about",
        "gender",
        "age",
        "skills",
    ];
    const updates = Object.keys(data || {});
    const isUpdateAllowed = updates.every((k) => ALLOWED_UPDATES.includes(k));
    if (!isUpdateAllowed) {
        return res.status(400).send("Invalid updates requested");
    }

    if (data?.skills?.length > 10) {
        return res.status(400).send("You can add maximum 10 skills");
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            data,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) return res.status(404).send("User not found");

        res.send(updatedUser);
    } catch (updateErr) {
        return res.status(400).send("Error updating user: " + updateErr.message);
    }
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



