// starting point of application where we write all nodejs code
// to get rid from closing server and re-run server use nodemon:-  npm i -g nodemon== it auto-refresh our server aftr   done any changes
const express = require("express");
const app = express(); //creating new expressjs app or web server

const {adminAuth,userAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);
app.get("/user",userAuth,(req,res)=>{
    res.send("User Data Sent");
});

app.get("/admin/getAllData",(req, res)=>{
   res.send("All Data Sent");
});
app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a user");
});
app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000...");
 });