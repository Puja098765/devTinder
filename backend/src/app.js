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



