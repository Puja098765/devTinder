const mongoose = require("mongoose");

const connectDB = async()=>{
mongoose.connect(
    "mongodb+srv://Puja123:Pha1nBtSabQQo8KS@namastenode.mqufo0o.mongodb.net/devTinder"
);
};
module.exports = connectDB;
