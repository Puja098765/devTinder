// starting point of application where we write all nodejs code
// to get rid from closing server and re-run server use nodemon:-  npm i -g nodemon== it auto-refresh our server aftr   done any changes
const express = require("express");
const connectDB= require("./config/database");
const app = express(); //creating new expressjs app or web server
const cookieParser = require("cookie-parser");

// Middleware activated for all the routes,it reads the json in postman convert into js obj and add js object back to req
app.use(express.json());
app.use(cookieParser());

 const authRouter = require("./routes/auth");
 const profileRouter = require("./routes/profile");
 const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/",requestRouter);

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
 
