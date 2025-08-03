const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
         required:true,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message: `{VALUE} is incorrect status type`
        },
    },
},{
    timestamps:true,
});
// compound indexing make this type of query faster like :- ConnectionRequest.find({fromUserId:58875859786,toUserId:48596889599})
connectionRequestSchema.index({ fromUserId: 1, toUserId:1});

// Middleware call everytime when connectionrequest will be save in db
connectionRequestSchema.pre("save", function (next){
    const connectionRequest = this;
    // Check if the fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!");
    }
    next();
});


const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);
module.exports = ConnectionRequestModel; 