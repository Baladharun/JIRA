const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(!token) 
        return res.status(401).send("You are not authenticated")
    
    jwt.verify(token,process.env.JWT_KEY,async(err,payLoad)=>{
        if(err) 
            return res.status(401).send("Token is not Valid!!!");
        req.email = payLoad.email;
        next();
    })
}
module.exports = {verifyToken};