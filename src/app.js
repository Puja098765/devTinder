// starting point of application where we write all nodejs code
// to get rid from closing server and re-run server use nodemon:-  npm i -g nodemon== it auto-refresh our server aftr   done any changes
const express = require("express");
const app = express(); //creating new expressjs app or web server
// app.use("/",(req,res)=>{
//     res.end("Hello from Puja");
// });

app.use("/hello",(req,res)=>{
    res.end("hello hello hello!");
 });

app.use("/test",(req,res)=>{
    res.end("Hello from the server!");
 });
app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000...");
 });