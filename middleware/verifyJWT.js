
const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next)=>{
const authHeader = req.headers.authorization || req.headers.Authorization;
if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
const token = authHeader.split(' ')[1];

jwt.verify(
    token,
    process.env.Access_Token_Secret,
    (err,decoded) => {
        if(err) return res.sendStatus(403); //unauthorised
        req.userId = decoded?.userInfo?.id; 
        req.username = decoded?.userInfo?.username
        req.roles = decoded?.userInfo?.roles || []
        next();
    }

)


}

module.exports = verifyJWT