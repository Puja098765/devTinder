const mongoose = require("mongoose");
// Defining User Schema
const userSchema = new mongoose.Schema({
firstName:{
    type:String
},
lastName:{
    type:String
},
emailId:{
    type:String
},
password:{
    type:String
},
age:{
    type:Number
},
gender:{
    type:String
}
});
// create mongoose models 1st parameter = name of model,2nd= useSchema
 module.exports = mongoose.model("User",userSchema);