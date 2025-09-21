const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const handleUserAuthentication = async(req,res)=>{

    const {username,password} = req.body;

    //if username and password are present in request
    if(!username || !password) return res.status(400).json({"message":"Username and Password both are required"})

    //Find username in DB
    const foundUser = await  User.findOne({username:username}).exec()
    if(!foundUser) return res.status(401).json({"message":"Username not Found"}) // unauthorized
    const verifyPW = await bcrypt.compare(password,foundUser.password)
    const roles = Object.values(foundUser.roles)
    if(verifyPW){
        try{
        const accessToken = jwt.sign(
            {
                userInfo: {
                    "id": foundUser._id, 
                    "username":foundUser.username,
                    "roles":roles
                }
            },
            process.env.Access_Token_Secret,
             {"expiresIn": '5m'}
        )
        const refreshToken = jwt.sign(
            {
                userInfo: {
                    "id": foundUser._id, 
                    "username":foundUser.username,
                    "roles":roles
                }
            },
            process.env.Refresh_Token_Secret,
             {"expiresIn": '8h'}
        )
        foundUser.refreshtoken = refreshToken;
        await foundUser.save();
        res.cookie("jwt",refreshToken,{httpOnly:true,secure:true,sameSite:"none",maxAge:8*60*60*1000})
        res.status(201).json({accessToken})

        }catch(error){
            res.status(500).json({"message1":error.message})
        }

    }else{
        return res.status(401).json({"message":"Wrong Password"}) // unauthorized
    }


}
module.exports = {
    handleUserAuthentication
}