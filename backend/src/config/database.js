const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://namastedev:kIm5yEmcLetnahVu@namastenode.ffjpghw.mongodb.net/devTinder");
};

module.exports = connectDB;


