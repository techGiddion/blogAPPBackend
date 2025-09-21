const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../model/User')

const handleUserRefresh = async(req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401) // unauthorised 
    const refreshToken = cookies?.jwt
    const foundUser = await User.findOne({refreshtoken:refreshToken}).exec()
    if(!foundUser) return res.sendStatus(403) // forbideen
    const roles = Object.values(foundUser.roles)

    jwt.verify(
        refreshToken,
        process.env.Refresh_Token_Secret,
        (err,decode)=>{
            if(err || foundUser.username !== decode.userInfo.username) return res.sendStatus(403) // forbideen
            const accessToken = jwt.sign(
            {
                userInfo: {
                    "id": foundUser._id, 
                    "username":decode.username,
                    "roles":roles
                }
            },
            process.env.Access_Token_Secret,
            {"expiresIn": '5m'}
        )
         return  res.status(201).json({accessToken}) 
    }
    )


}

module.exports = {
    handleUserRefresh
}