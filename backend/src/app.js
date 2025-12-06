const express= require('express');
const app = express();

const { adminAuth ,userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/user" , userAuth, (req,res)=>{
    res.send( { firstName: "Puja", lastName: "Keshri"});
});

app.get("/admin/getAllData", (req,res) => {
    res.send("All Data Sent");
});

app.post("/user", (req,res)=>{
    console.log("Save data to the database");
    res.send( "Data saved successfully");
});

// app.use("/hello", (req,res)=>{
//     res.send("Hello Hello!");
// });

// app.get("/get", (req,res)=> {
//     res.send("Get api called");
// });

app.listen(3000, ()=>{
    console.log("server listening on port 3000");
})