// starting point of application where we write all nodejs code
// to get rid from closing server and re-run server use nodemon:-  npm i -g nodemon== it auto-refresh our server aftr   done any changes
const express = require("express");
const app = express(); //creating new expressjs app or web server

// This will only handle GET call to /user
app.get("/user",(req,res)=>{
   res.send({firstName:"Puja", lastName:"Keshri"});
});

app.post("/user",(req,res)=>{
   res.send("Data successfully saved to the database");
});

app.delete("/user",(req,res)=>{
   res.send("Deleted successfully!");
})

// This will match all the HTTP method API calls to /test 
app.use("/test",(req,res)=>{
    res.send("Hello from the server!");
 });

//  app.use("/",(req,res)=>{
//     res.send("Hello from Puja");
//  });  // if at first , this code  overwrites everythings and any-other routes doesn't work ,if we place at last then it will work
app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000...");
 });