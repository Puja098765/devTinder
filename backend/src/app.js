const express=  require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

require("dotenv").config();


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
const paymentRouter = require("./routes/payment");
const initializeSocket = require('./utils/socket');
const chatRouter = require('./routes/chat');



app.use("/", authRouter);
app.use("/", profileRouter );
app.use("/", requestRouter); 
app.use("/",userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);


// first connect to database then listen to server
connectDB()
.then(()=>{
    console.log("Database connected successfully");
    server.listen(process.env.PORT, ()=>{
    console.log("server listening on port 3000");
});
})
.catch((err) =>{
    console.log("Database connection failed", err);
});



