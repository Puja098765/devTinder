// Handle Auth Middleware for all GET POST,... requests
// this middleware only be called for /admin
 const adminAuth= (req,res,next)=>{
    const token ="xyz";
    const isAdminAuthorized= token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    } else {
        next();
    }
};
 const userAuth= (req,res,next)=>{
    const token ="xyzabc";
    const isAdminAuthorized= token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    } else {
        next();
    }
};
module.exports={adminAuth,userAuth};