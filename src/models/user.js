const mongoose = require("mongoose");
// Defining User Schema
const userSchema = new mongoose.Schema({
firstName:{
    type:String,
    required: true,
    minLength:4,
    maxLength:50,
},
lastName:{
    type:String,
    
},
emailId:{
    type:String,
    required: true,
    unique:true,
    lowercase:true,
    trim: true,
},
password:{
    type:String,
    required: true,
},
age:{
    type:Number,
    min:18,
    
},
gender:{
    type:String,
    validate(value){
        if (!["male","female","others"].includes(value)){
            throw new Error("Gender data is not valid");
        }
    }
},
photoUrl:{
    type: String,
    default:"https://toppng.b-cdn.net/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png",
},
about:{
    type: String,
    default: "This is a default about of the user!", 
},
skills:{
    type:[String],
},
},{
    timestamps: true,
});
// create mongoose models 1st parameter = name of model,2nd= useSchema
 module.exports = mongoose.model("User",userSchema);