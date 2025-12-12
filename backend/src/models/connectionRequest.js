  const mongoose = require('mongoose');

  const connectionRequestSchema = new mongoose.Schema({
        
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //reference to the user collection
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message:`{VALUE} is incorrect status type`,
        },
    },
  },
  {timestamps: true }
);

// compound indexing
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1});



//  this is like middleware called every time before saving a connection request
  connectionRequestSchema.pre("save",  function () {
       const connectionRequest = this;
    //    Check if the fromUserId is same as toUserId
      if (String(this.fromUserId) === String(this.toUserId)) {
         throw new Error("Cannot send connection request to yourself!");
    }
    
  });

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;