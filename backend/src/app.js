const express=  require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
// express json middleware to convert  body's json data to js object
app.use(express.json());
// cookie parser middleware to convert long string into a simple JavaScript object and helps your server read ,see, use cookies sent from the browser..
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter );
app.use("/", requestRouter);
app.use("/",userRouter);


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



