const User = require('../model/User')
const handleUserLogout = async(req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204) // no content
    const refreshToken =  cookies?.jwt;
    const foundUser = await User.findOne({refreshtoken:refreshToken}).exec()
    if(!foundUser) {
        //clear cookies
        res.clearCookie('jwt',{httpOnly:true,maxAge:8*60*60*1000})
        return res.sendStatus(204) // no content
    }
    foundUser.refreshtoken = ''
    await foundUser.save();

    // clean all cookies 
    // delete refresh token
    // move to login page - frontend
    res.clearCookie('jwt',{httpOnly:true,secure:true,same,sameSite: 'none',maxAge:24*60*60*1000}) // on prod add secure:true
    return res.sendStatus(204)//No content

}

module.exports={
    handleUserLogout
}