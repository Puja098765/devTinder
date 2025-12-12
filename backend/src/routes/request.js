const express = require('express');
const requestRouter  = express.Router();

const { userAuth } = require('../middlewares/auth');
const  ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) =>{
try {
   const fromUserId = req.user._id;
   const toUserId =req.params.toUserId;
   const status = req.params.status;

   const allowedStatus = ["ignored", "interested"];
   if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status type:" + status});
   }

// Check logged in user is not sending request to self is job of like schema pre save middleware


//    Check toUserId is existing user in db
     const toUser = await User.findById(toUserId);
     if (!toUser) {
        return res.status(404).json({message: "User not found !"});
     }

//    IF there is an existing request from the same fromUserId to toUserId, then we should not allow creating a new request
    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId},
        ],

    });
    if (existingConnectionRequest) {
        return res.status(400).json({ message: "A connection request already exists between these users."});
    }

   const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
   });

   const data =  await connectionRequest.save(); 
    res.json({ message: req.user.firstName + " is " +  status +  " in " +  toUser.firstName, data,});

} catch (err) {
    res.status(400).send("ERROR: " + err.message);
}
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
   
        // Validate the status
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
               return res.status(400).json({ message: "Status  not allowed!"});
        }


        // Puja => Madhu 
        // loggedIn == toUserId
        // status = interested
        // request Id should be valid

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection request not found "});
        }

         connectionRequest.status = status;

         const data = await connectionRequest.save();
         res.json({ message: "Connection  request " + status, data});


    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});


module.exports = requestRouter;
